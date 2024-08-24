using Chat.Models;
using Docker.DotNet.Models;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Caching.Distributed;
using System.Text.Json;

namespace Chat.Hubs
{
    public interface IChatClient
    {
        public Task ReceiveMessage(string userName, string message);
    }

    public class ChatHub : Hub<IChatClient>
    {
        private readonly IDistributedCache _cache;

        public ChatHub(IDistributedCache cache)
        {
            _cache = cache;
        }

        public async Task JoinChat(UserConnection connection)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, connection.ChatRoom);

            var stringConnection = JsonSerializer.Serialize(connection);
            await _cache.SetStringAsync(Context.ConnectionId, stringConnection);

            await NotifyGroup(connection.ChatRoom, "Admin", $"{connection.UserName} join chat");
        }

        public async Task SendMessage(string message)
        {
            var connection = await GetConnection(Context.ConnectionId);

            if (connection is not null)
            {
                await NotifyGroup(connection.ChatRoom, connection.UserName, message);
            }
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            var connection = await GetConnection(Context.ConnectionId);

            if (connection is not null)
            {
                await _cache.RemoveAsync(Context.ConnectionId);
                await Groups.RemoveFromGroupAsync(Context.ConnectionId, connection.ChatRoom);

                await NotifyGroup(connection.ChatRoom, "Admin", $"{connection.UserName} left chat");
            }

            await base.OnDisconnectedAsync(exception);
        }

        // Getting and deserialization function
        private async Task<UserConnection?> GetConnection(string connectionId)
        {
            var stringConnection = await _cache.GetStringAsync(connectionId);
            return stringConnection is not null
                ? JsonSerializer.Deserialize<UserConnection>(stringConnection)
                : null;
        }

        // Notify function
        private async Task NotifyGroup(string chatRoom, string userName, string message)
        {
            await Clients.Group(chatRoom).ReceiveMessage(userName, message);
        }
    }
}
