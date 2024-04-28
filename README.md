here goes my learning process to write a discord BOT app, using discord.js package.

first of all, in order to create a discord BOT, you need to do it inside of the discord's website panel, simply name your bot and add it to a server of your choice, and it also has a token which is regeneratable. install the package needed and go on into your code editor. the simplest form of connection between you and your BOT can be like this:

    const { Client, GatewayIntentBits } = require('discord.js');

    const client = new Client(
        {
            intents: [
                GatewayIntentBits.Guilds,
            ]
        }
    )

    client.login(process.env.DISCORD_BOT_ID) // token which you can get from your bot's panel.

this way, you created an instance of a client, and established a WebSocket connection with the BOT available in your server.
from this moment, all you need to know is to learn how to command your bot, and what are different kind of commands you can use when using discord.js package. so the login method of the client establishes a WebSocket connection. what's the intents option in the Client's constructor ?

first of all, the design pattern between a discord bot is an Event-Driven design. meaning that everything is an event. in Discord's API, Intents are groups of events related to them, which a BOT can subscribe on. since data is important, and also we don't want our BOT to just listen to all of the events that happening in the server, we are just simply using this intents option to tell BOT that which of the events or group of events it should listen, or subscribe on. for example, if we say that the bot should listen only on Guilds event (Guilds in Discord API stands for Servers), only some events that are described under the Guilds Intent by Discord's API are sent to the BOT, in other words, the BOT will only listen to those events, not all the other events that happen in the server. we can go to the Discord website documentation to see all the intents and their events which we can use, but the important thing now is to understand what is exactly an Intent and it's Events. It's important to choose your intents wisely because events take bandwidth and use memory, so in order to reduce memory usage and use less bandwidth within our bot, it is wise to choose our intents around the functionality of our BOT and not furthermore.

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

    const { Client, IntentsBitField } = require('discord.js');

    const myIntents = new IntentsBitField([
        IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages,
    ])

    // or you can use .add() or .remove() methods of that class to add or remove intents from it whenever needed:
    myIntents.add(IntentsBitField.Flags.MessageContent);

    // and finally we can use:
    const client = new Client({
        intents: myIntents,
    })

    client.login(process.env.DISCORD_BOT_ID) // works the same.

that's all about the intents, come back to this document anytime you forget about the events or anything related to intents, and let's move on to the next chapter of learning how to write your personal discord BOT.

Slash Commands: