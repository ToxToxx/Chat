using Chat.Models;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Caching.Distributed;

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
            
            await Clients
                .Group(connection.ChatRoom)
                .ReceiveMessage("Admin",$"{connection.UserName} join chat");
        }

        public async Task SendMessage(string message)
        {
            await Clients
                .Group()
        }
    }
}
