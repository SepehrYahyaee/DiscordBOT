Here goes my learning process to write a discord BOT app, using *discord.js* package.

# Getting Started

first of all, in order to create a discord BOT, you need to do it inside of the discord's website panel, simply name your bot and add it to a server of your choice, and it also has a token which is regeneratable. install the package needed and go on into your code editor. the simplest form of connection between you and your BOT can be like this:

```
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client(
    {
        intents: [
            GatewayIntentBits.Guilds,
        ]
    }
)

client.login(YOUR_DISCORD_BOT_TOKEN) // token which you can get from your bot's panel.
```

this way, you created an instance of a client, and established a websocket connection with the BOT available in your server.
from this moment, all you need to know is to learn how to command your bot, and what are different kind of commands you can use when using discord.js package. so the login method of the client establishes a *WebSocket Connection*. what's the intents option in the client's constructor ?

first of all, the design pattern between a discord bot is an **Event-Driven** design. meaning that everything is an event. in Discord's API, Intents are groups of events related to them, which a BOT can subscribe on. since data is important, and also we don't want our BOT to just listen to all of the events that happening in the server, we are just simply using this intents option to tell BOT that which of the events or group of events it should listen, or subscribe on. for example, if we say that the bot should listen only on Guilds event (Guilds in Discord API stands for Servers), only some events that are described under the Guilds Intent by Discord's API are sent to the BOT, in other words, the BOT will only listen to those events, not all the other events that happen in the server. we can go to the Discord website documentation to see all the intents and their events which we can use, but the important thing now is to understand what is exactly an Intent and it's Events. It's important to choose your intents wisely because events take bandwidth and use memory, so in order to reduce memory usage and use less bandwidth within our bot, it is wise to choose our intents around the functionality of our BOT and not furthermore.

now let's move on to the list of all Intents available in Discord's API and their particular Events. (some of the Intents are privilaged, since data is important, we don't want anybody to just get some personal data of users. you can read more about that in the official documentation but that is not our concern right now, since we can continue developing without a permission because our bot is not at least on 100 servers.) There are 19 intents usable for us, 3 of them are privilaged at the time of writing this document, which I list them below alongside with their events named by discord.js package:

        INTENT          EVENTS
    ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――
    ❖   Guilds:

        guildCreate             guildUpdate             guildDelete
        roleCreate              roleUpdate              roleDelete
        channelCreate           channelUpdate           channelDelete           channelPinsUpdate
        threadCreate            threadUpdate            threadDelete            threadListSync      threadMember(s*)Update
        stageInstanceCreate     stageInstanceUpdate     stageInstanceDelete
    ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――
    ❖   GuildMembers: (privilaged)
    
        guildMemberAdd          guildMemberUpdate       guildMemberRemove       threadMembersUpdate*
    ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――
    ❖   GuildModeration:
    
        guildAuditLogEntryCreate                        guildBanAdd             guildBanRemove
    ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――
    ❖   GuildEmojisAndStickers:

        emojiCreate             emojiUpdate             emojiDelete             stickerCreate       stickerUpdate
        stickerDelete
    ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――
    ❖   GuildIntegrations:

        guildIntegrationsUpdate
    ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――
    ❖   GuildWebhooks:

        webhookUpdate           webhooksUpdate
    ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――
    ❖   GuildInvites:

        inviteCreate            inviteDelete
    ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――
    ❖   GuildVoiceStates:

        guildVoiceStatesUpdate
    ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――
    ❖   GuildPresences: (privilaged)

        presenceUpdate
    ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――
    ❖   GuildMessages:

        messageCreate           messageUpdate           messageDelete           messageDeleteBulk
    ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――
    ❖   GuildMessageReactions:

        messageReactionAdd      messageReactionRemove   messageReactionRemoveAll messageReactionRemoveEmoji
    ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――
    ❖   GuildMessageTyping:

        typingStart
    ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――
    ❖   DirectMessages:

        messageCreate           messageUpdate           messageDelete            channelPinsUpdate
    ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――
    ❖   DirectMessagesReactions:

        messageReactionAdd      messageReactionRemove   messageReactionRemoveAll messageReactionRemoveEmoji
    ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――
    ❖   DirectMessageTyping:

        typingStart
    ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――
    ❖   MessageContent: (privilaged)

        does not represent individual events, but rather affects what data is present for events that could contain message content fields.
    ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――
    ❖   GuildScheduledEvents:

        GuildScheduledEventCreate   GuildScheduledEventUpdate   GuildScheduledEventDelete   GuildScheduledEventUserAdd
        GuildScheduledEventUserRemove
    ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――
    ❖   AutoModerationConfiguration:

        autoModerationRuleCreate    autoModerationRuleUpdate    autoModerationRuleDelete
    ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――
    ❖   AutoModerationExecution:

        autoModerationActionExecution
    ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――

so this was the list for all available intents and their related events which our BOT can subscribe on them whenever their intent is added to the array of intent options inside the Client's constructor.

*Thread Members Update contains different data depending on which intents are used.

now that we have covered almost everything about intents, the last thing to know is that the discord.js module provided another way of adding (or removing) intents to our client, using "IntentsBitField" Class which has a "Flags Property" which inside it, we have all the intents available and we can use that like the code below instead of manually assigning intents:

```
const { Client, IntentsBitField } = require('discord.js');

const myIntents = new IntentsBitField([
    IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages,
])

// or you can use .add() or .remove() methods of that class to add or remove intents from it whenever needed:
myIntents.add(IntentsBitField.Flags.MessageContent);

// and finally we can use:
const client = new Client({
        : myIntents,
})

client.login(YOUR_DISCORD_BOT_TOKEN) // works the same.
```

that's all about the intents, come back to this document anytime you forget about the events or anything related to intents, and let's move on to the next chapter of learning how to write your personal discord BOT.

## Slash Commands:

Discord allows it's BOT developers to write and register **Slash Commands** for their BOTs. why does it matter and why is it important? because it is a first-class, much more better way for users to interact with your BOT. rather than casually writing texts (imagine writing 'ping' or 'hey' in chat in order for BOT to do something!), we can now learn how to actually write commands specificly for a BOT and users can use these slash commands with */* and then they can see all the previously defined commands for BOT to use. we can even implement a /help command to explain the usages of all the other commands...

when you type '/' in discord's chat section in some guild, there pops another section of all available slash commands. by default there are some built-in slash commands for all users to use, for example /kick or /ban or /me ... but when you register commands only for your BOT, whether only for your guild or for all the guilds that use your BOT, there comes a specific section besides Built-In named for your BOT, that lists all the available slash commands that users can use. enough of the explanation of what actually a slash command is, let's move on to the next part.

the procedure of writing, registering, and adding a slash command has different parts. the order of doing them doesn't matter but in order for those commands to work, we must do all of these parts. in it's simplest form, it looks like this:

1. Registering your desired commands (their name + description) to your BOT.
2. Listening on events specified for when a user uses a slash command: 'interactionCreate'.
3. checking if the interaction has been created by a BOT, and if so, replying to it with the desired functionality.

this is the most simple form of registering and using slash commands for your BOT. now let's demonstrate it:

first we gotta register our commands. To do so, we need a different file to write the code needed, which I talk about the reason behind it soon. imagine a file named register-commands.js somewhere in your project directory which looks like this:

```
const { REST, Routes } = require('discord.js);

const rest = new REST().setToken(YOUR_BOT_TOKEN);

// commands you want to register, an array of objects which has a name and description property.
// it later will be added to the pop up section in discord as a name and description of the registered command.

const commands = [
    { name: 'hey', description: 'Replies with Hey!' },
    { name: 'shalqam, description: 'Replies with Shalaqatain!' },
];

// we need to request (PUT method) the discord API to tell them to register these commands on our bot and on our server(s)
// to do that, we use the built-in REST class which we made an instance of it earlier to make a put request.
// but we wrap it all in a function, and make it an IIFE (or don't if you don't want it doesn't even matter):

async function registerCommands() {
    try {
        console.log(`Registering ${commands.length} slash commands...`);

        const data = await rest.put(
            Routes.applicationGuildCommands(YOUR_BOT_CLIENT_ID, YOUR_GUILD_ID),
            { body: commands },
        );

        console.log(`Successfully registered/added ${data.length} slash commands.`);

    } catch (error) {
        console.log(error);
    }
};

registerCommands(); // call it to work!
```

because Discord's API has some restrictions as far as I know, about limiting the registration of slash commands, so it's better to not just use this function whenever you run your goddamn BOT. just run it when you add a new command or when you register a new one, otherwise it's not needed and that's why we use another file to write this down. just run this file once before you start your BOT and it's all good to go.

now we have registered our commands, and we can see them in our discord server using '/' and we see a new section for our BOT.
the next thing to do, is to interact with it, and write the functionality (simple form) for it: (in our app.js or main file)

```
client.on('interactionCreate', (interaction) => {
        
    // check if the interaction is an slash command: (returns true|false)
    if (interaction.isChatInputCommand()) {
        if (interaction.commandName === 'shalqam') interaction.reply('Shalaqatain!'); // check the commandName and reply
        else if (interaction.commandName === 'hey') interaction.reply('Hey!');
    } 
});
```

and now we successfully wrote a bunch of code (although it's so fucked up) that registered our slash commands and we can interact with them and respond accordingly too! but there are a lot of better ways to do so, which we are going to discuss.
remember, anytime you want to register another command you don't to have all the previous ones in your commands object and it's better to remove them (or comment them), however it's not a good way of coding and we are going to talk about it soon enough, but for now let's just accept it.
