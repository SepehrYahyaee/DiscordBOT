Here goes my learning process to write a discord BOT app, using *discord.js* package. This is a documentation for my own future self, feel free to use it if it suits your needs though.

# Getting Started: Boilerplate

first of all, in order to create a discord BOT, you need to do it inside of the discord's website panel, simply name your bot and add it to a server of your choice, and it also has a token which is regeneratable. install the package needed and go on into your code editor. the simplest form of connection between you and your BOT can be like this:

```js
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

```js
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

## Slash Commands

Discord allows it's BOT developers to write and register **Slash Commands** for their BOTs. why does it matter and why is it important? because it is a first-class, much more better way for users to interact with your BOT. rather than casually writing texts (imagine writing 'ping' or 'hey' in chat in order for BOT to do something!), we can now learn how to actually write commands specificly for a BOT and users can use these slash commands with */* and then they can see all the previously defined commands for BOT to use. we can even implement a /help command to explain the usages of all the other commands...

when you type '/' in discord's chat section in some guild, there pops another section of all available slash commands. by default there are some built-in slash commands for all users to use, for example /kick or /ban or /me ... but when you register commands only for your BOT, whether only for your guild or for all the guilds that use your BOT, there comes a specific section besides Built-In named for your BOT, that lists all the available slash commands that users can use. enough of the explanation of what actually a slash command is, let's move on to the next part.

the procedure of writing, registering, and adding a slash command has different parts. the order of doing them doesn't matter but in order for those commands to work, we must do all of these parts. in it's simplest form, it looks like this:

1. Registering your desired commands (their name + description) to your BOT.
2. Listening on events specified for when a user uses a slash command: 'interactionCreate'.
3. checking if the interaction has been created by a BOT, and if so, replying to it with the desired functionality.

this is the most simple form of registering and using slash commands for your BOT. now let's demonstrate it:

first we gotta register our commands. To do so, we need a different file to write the code needed, which I talk about the reason behind it soon. imagine a file named register-commands.js somewhere in your project directory which looks like this:

```js
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

```js
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

Imagine, having like a hundred slash commands for your BOT. It would be a shit pile of code for sure to develop that BOT in this way, no doubt! honestly, even with just 2 or 3 commands I feel like a shit even attempting to write like this, for real. It needs to be modular and also dynamic. Here's the stuff I am going to do in order to make this code much more better and much more efficient than this shit:

- Slash commands need to be in their respective seperate folder, each of them have their own file containing of their own information.
- Event listening act on *interactionCreate* should be dynamic, and by that, I mean that it shouldn't be like a hundred if/else expressions just to see which slash command is being used and then respond accordingly! It should be dynamic, we gotta provide a way for writing the code, to execute the needed function according to the name of the command automatically, and not using the if/else statements anymore.
- When seperating slash commands, we need to have a way to grab all of them, reading all of them from their different files and insert all of them in their correct format, both when registering them in *register-commands.js* file and when try to handle them, which we talk about it later on.

I created a *SlashCommands* folder which contains of all the slash commands provided. In order to make slash commands this way, the discord.js package has provided us with a class named `SlashCommandBuilder` and we can import it easily. then we can make a simple slash command with it by chaining methods like below:

```js
const { SlashCommandBuilder } = require('discord.js');

const command = new SlashCommandBuilder()
    .setName('shalqam')
    .setDescription('Replies with Shalaqatain!');
```

> [!NOTE]
> There are rules for naming slash commands for your BOT which we have to obey, otherwise it wouldn't work as expected. Names of slash commands have to be **only lower-case letters** ranging from **1 to 32 characters** and not containing any symbols or any spaces, although using **Hyphen (-) or Underline(_) is okay**.

After building our slash command, we need to have a function for it, which executes everytime this command gets called:

```js
async execute(interaction) {
    await interaction.reply('Shalaqatain!'); // your desired functionality for this command.
};
```

Since we're going to export these and use them elsewhere, it's better to make them both, the command object itself and it's execution function properties of the *module.exports* so that we can easily later use *require* on them. So the final look of a single slash command file is:

```js
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shalqam')
        .setDescription('Replies with Shalaqatain!'),

    async execute(interaction) {
        await interaction.reply('Shalaqatain!'); // or any desired functionality.
    }
};
```

With that being said, we create a file for each slash command and write their information following the model above, easily. Next, I am going to make the act of registering commands (in the register-commands.js file) dynamic, since we're going to define all of our commands in their seperate folder, we need a way to grab all the information and pass it to the commands list there. we can use built-in node modules such as **node:fs** and **node:path** in order to do that, like this:

```js
const fs = require('fs');
const path = require('path');

const commands = [];

const commandFiles = fs.readdirSync(path.join(__dirname, 'SlashCommands')) // In my case, I named it SlashCommands folder.

for (const file of commandFiles) {
    const filePath = path.join(path.join(__dirname, 'SlashCommands'), file);
    const command = require(filePath);

    ('data' in command && 'execute' in command) 
    ? commands.push(command.data.toJSON()) 
    : console.log(`data or execution function is missing at path: ${filePath}`);
};
```

And after that, using the same *registerCommands* function and pass the commands to it. In this state of program, commands are now being registered dynamically and we no longer need to manually insert/delete them from the commands array. Also all of the commands are now modular and are in their respective file in their respective folder. Whenever we need to update them or make any changes overally, we can go their folder and their not just sitting in the middle of a file for god sake. The last thing we need to do right now, is to make a way to also dynamically listen to all of the commands altogether and get rid of the if/else statements.

**Creating a Map**:

We need to find a way to dynamically listen on all slash commands that there is, rather than using if/else statements which make our code's readability a lot worse. Here's the catch, the *interaction* which we pass to the *execute* function of the slash command, has access to the *client's instance* through `interaction.client`. If we have a property on the client, let's say a map object, which has the name of the slash commands as the first element, and their whole object containing data and execute function as the second element, mapped to each other, we can access through all of the slash commands names and their whole objects (lets say we named the property on client: `client.commands`), whenever someone uses a command and we can respond accordingly by using this property and access to their execute function, it would be something like this:

```js
const fs = require('fs');
const path = require('path');
const { Collection } = require('discord.js');

client.commands = new Collection(); // discord.js provided us with a Collection class which extends the original Map.

const commandFolders = fs.readdirSync(path.join(__dirname, 'SlashCommands'));

for (const file of commandFolders) {
    const filePath = path.join(path.join(__dirname, 'SlashCommands'), file);
    const command = require(filePath);

    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command); // set: [commandName, commandObject]
    } else {
        console.log(`data or execute property is missing at file ${filePath}`);
    }
};
```

The commands above is used to store all the slash commands available to the `client.commands` property effectively. Then we can listen dynamically on all slash commands like below:

```js
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return; // if the interaction wasn't a slash command, ignore it!

    // since we have access to interaction's name via interaction.commandName, so we use it to get it's object from the Map.
    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) {
        console.log(`such slash command doesn\'t exist: /${interaction.commandName}`);
        return;
    }

    try {
        await command.execute(interaction); // run the commands execute function if available.
    } catch (error) {
        console.error(error); // log any errors if occured.

		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
    }
});
```

And with this way of coding, we have managed to listen on all slash commands dynamically without the need of if/else statements. All the steps are now done, run the `register-commands.js` file once to load all the commands to your BOT and start using them.

> [!Tip]
> You can manage to make your **Slash Commands** folder tidier than it is by grouping a bunch of slash commands together. For example, we might have some slash commands that are utilities, some other slash commands might be about managing, some others may be about role activites and many other stuff. You can make folders for them and write your slash commands file inside each one of them, but remember that you need to change the code for command handling because it has to read all the files within the folders from now on. It's not that big of a deal, but It was worth noting, for the sake of more modular coding. (damn, it has a rhyme)

We will know more about slash commands and the options/choices and other stuff they can get. For now, let's move on to the next part.

### Event Handling

If you understood the pattern and approach we used to make the slash commands registration and handling both dynamic and also modular, It will be all good from now on because we're going to use the same approach to make our event listening process also modular. In order to do that, we make a folder named `events` and in that, we list our desired events each in their own file, and the form is similar to the slash commands, like below: (for example, the 'ready' event.)

```js
module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`The bot ${client.user.tag} is ready!`);
    }
};
```

And then we need to make events able to being read dynamically in our main file, similar to slash commands:

```js
const eventsFiles = fs.readdirSync(path.join(__dirname, 'events'));

for (const file of eventsFiles) {
    const filePath = path.join(path.join(__dirname, 'events'), file);
    const event = require(filePath);

    (event.once)
    ? client.once(event.name, (...args) => event.execute(...args))
    : client.on(event.name, (...args) => event.execute(...args));
}
```

This dynamic events reader works for all the events that you listen on, in their respective file in events folder. From now on it is better to write your desired events to listen, in `events` folder and in their own file. You can see other examples in the code too. With these approaches, our code is much more modular and it's readability has been improved a lot. Now we're talking.

> [!IMPORTANT]
> This is exactly the ***Boilerplate*** of the project, and it is good to make a way, a CLI or something similar for ourselves to not write all of this code again for all the client's we are developing. Note to future self: develop a way to generate these boilerplate stuff, and not just write it from scratch everytime. Maybe even build a framework on top of it!

# Slash Commands Details

## Different Responses

There are different response methods to use when working with slash commands and the interaction object they get. Using any of these response methods informs Discord that our BOT has received the interaction and responded, and actually forces this mechanism because it wants to make sure all of the slash commands have good UX. If BOT fails to respond properly, then the failure message is going to be shown by Discord itself even if the BOT is doing some other jobs other than responding. So it's important to use the various response methods which we are going to discuss when working with slash commands. Different responses are:

1. Simple response using the `.reply()` method.
2. Ephemeral response using `{ ephemeral: true }` in interaction different response objects.
3. Editing response using `.editReply()` method.
4. Deferred response using `.deferReply()` method.
5. Follow-up response using `.followUp()` method.
6. Fetch/Delete responses using `.fetchReply()`/`deleteReply()` methods.
7. Localized responses using `intereaction.locale` property.

### Simple Response
As it's name is showing, it is the most simple way to respond and in fact we used it in the examples too. This method acknowledges the interaction and responds with the response defined in it. The token for this interaction is only valid for **3 seconds** and this means that we only got 3 seconds to respond when an interaction is received: `interaction.reply('Hi');`

### Ephemeral Response
It is not required at all times, that all the members of a channel or the ones that has access to it see a response that a BOT provides when a user uses a slash command. Sometimes we need an answer to be shown to the user who used the command himself/herself, and not everyone. To do that, response methods can be customized to have an option to respond only for the user who used the command, like this: `interaction.reply({ content: 'Hi', ephemeral: true });` by making the ephemeral flag true inside the reply object.

### Editing Response
Sometimes you need to edit the response you have previously provided. After the initial 3 seconds of time that you have to respond, if you happen to respond properly, then the token for updating or editing your response is going to be valid for another **15 minutes**, meaning that you can edit your message in the next 15 minutes. The result would be the same message but edited, not creating a new one: 

```js
interaction.reply('Hi');
// wait some seconds or minutes less than 15 minutes.
interaction.editReply('Hello');
```

### Deferred Response
As you already know, you only have 3 seconds to respond to an interaction but what if the thing you need to do to answer to the interaction takes more than 3 seconds of time? What if you need to fetch an API in order to answer? In this times we gotta use deferred response. when you use `interaction.deferReply();` it makes the app show `<application> is thinking...` message and it counts as an initial response which satisfies the 3 second time. Then we can compute our response and when the answer is ready, change it with `.editReply()` method or a FollowUp which we are going to discuss next. Also note that you can make the answer ephemeral in these respond methods too, but for editing or following up, **ephemeral state can not be changed once done**.

### Follow-Up Response
You can use the `.editReply()` method to edit your answer but what if you responded and then after some time you want to respond again? In these situations we use the `.followUp()` method of the interaction after the initial response which replies to the previous response that BOT has provided, can be ephemeral too, and when used after `deferReply()` it changes the `<application> is thinking...` state as an edit, and wouldn't reply to it.

> [!Note]
> We can use the form **\[text](link)** in our response messages to send a link.

### Fetch/Delete Response
There are ways provided to Delete a reply after replying, or fetch the whole message object to work on it:

```js
const message = interaction.fetchReply();
interaction.deleteReply();
```

### Localized Response
Each interaction has a property named `interaction.locale` which stores the data of the user's local language. We can fetch this information to know what language an specific user is using and respond accordingly.

This was all about the different ways to respond and the properties to use in order to have a better response. Use them as needed.

## Options & Choices

### What are these?

The previous ways of making a slash command were all simple ones, just a name and a description. We can do more, like adding options and choices for those options to our slash commands. First we start by explaining how to add options in the old way before refactoring our code to the modular way. Now before going that way, what is an option? **Options are for times that your slash command needs an input (optional or not) to work on, like an argument to the function! Choices are for times when you want to define predetermined values for this options**. That simple. Now, remember how we used to write slash commands? 

### Bad way

It was like this before making it look fancy:

```js
const commands = [
    {
        name: "add",
        description: "Adds two numbers!",
        options: [
            {
                name: "firstNumber", description: "The first number!",
            },
            {
                name: "secondNumber", description: "The second number!",
            },
        ];
    };
];
```

Now we just added two option inputs to our command `/add`. But it's not so cool. First of all, the code is so messy and second, user can just input string or boolean or whatever the hell he/she wants to this command, and worse than that they can even not input anything at all and the command would be fine! We can add options for those too of course like:

```js
const { ApplicationCommandOptionType } = require('discord.js');

const commands = [
    {
        name: "add",
        description: "Adds two numbers!",
        options: [
            {
                name: "firstNumber", description: "The first number!", type: ApplicationCommandOptionType.Number, required: true,
            },
            {
                name: "secondNumber", description: "The second number!", type: ApplicationCommandOptionType.Number, required: true,
            },
        ];
    };
];
```

This way, now both commands use the `required` option which make the user have to input them, and then we assigned type to both of them, `Number type` which makes the user to input only numbers. We can collect those received inputs in our execute function by reaching `interaction.options.get('optionName')` and do whatever the hell we want with them, just look for their types. Now for having predetermined values for users to choose from which pops up in the Discord's interface, we must add choices to our options like this:

```js
const { ApplicationCommandOptionType } = require('discord.js');

const commands = [
    {
        name: "add",
        description: "Adds two numbers!",
        options: [
            {
                name: "firstNumber", description: "The first number!", type: ApplicationCommandOptionType.Number, required: true, choices: [
                    { name: 'one', value: 1}, { name: 'two', value: 2},
                ]
            },
            {
                name: "secondNumber", description: "The second number!", type: ApplicationCommandOptionType.Number, required: true, choices: [
                    { name: 'one', value: 1}, { name: 'two', value: 2},
                ]
            },
        ];
    };
];
```

Now we've defined two choices for each option of the `/add` command. User can choose between `one` and `two` and the value of them will be replaced in options position. Note that once you choose choices for an input, the only valid inputs from that moment on would be only from the choices list not anything else, take care. This was the old way of adding options and choices and retreiving them in the execute function of those commands. Now let's learn the new fancy way doing so and it's way better code styling and helpful features.

### Good way

We make slash commands, simple ones, using the `SlashCommandBuilder` class provided in *discord.js* package, like:

```js
const { SlashCommandBuilder } = require('discord.js');

const data = new SlashCommandBuilder()
    .setName('hi')
    .setDescription('Replies with Hello')
```

Now you know the meaning of options and choices. For adding them using the new way we gotta use the different methods that the package provided us and chain them. Different methods for input options that also has specific types in them are:
- `addStringOption()` for string input option.
- `addNumberOption()` for number input option (integers and decimals).
- `addIntegerOption()` for integer input option.
- `addBooleanOption()` for true/false input option.

- `addUserOption()` for userId (id) input option or select from a list.
- `addChannelOption()` for channelId (id) input option or select from a list.
- `addRoleOption()` for role (id) input option or select from a list.
- `addMentionableOption()`

- `addAttachmentOption()` for uploading file.

- `addSubCommand()` 
- `addSubCommandGroup()`

Using any of them doesn't make a difference, they all are methods that accept a callback with a single option argument, like below. Remember that options need name and description here too, only types are checked with the method and required flag also has a method which you will see here too. (`setRequired(true|false)`)

```js
const { SlashCommandBuilder } = require('discord.js');

const data = new SlashCommandBuilder()
    .setName('add')
    .setDescription('Adds two numbers.')
    .addNumberOption(option => option.setName('firstNumber').setDescription('The first number.')).setRequired(true)
    .addNumberOption(option => option.setName('secondNumber').setDescription('The second number.')).setRequired(true)
```

Now we have successfully made options for the `/add` slash command. To add choices to this options, me do like this:

```js
const { SlashCommandBuilder } = require('discord.js');

const data = new SlashCommandBuilder()
    .setName('add')
    .setDescription('Adds two numbers.')
    .addNumberOption(option => 
        option.setName('firstNumber')
        .setDescription('The first number.'))
        .setRequired(true)
        .addChoices(
            { name: 'one', value: 1},
            { name: 'two', value: 2},
        )
    .addNumberOption(option => 
        option.setName('secondNumber')
        .setDescription('The second number.'))
        .setRequired(true)
```

And finally we added two choices for our first option of the `/add` slash command. There are some more things to know. We can have more validation to the type and some more things after initializing:
- We can use `.setMaxLength()` and `setMinLength()` for string types to specify their length range as chained methods.
- We can use `.setMaxValue()` and `setMinValue()` for integer and number types to specify their min/max values.
- We can use `addChannelTypes()` to add restrictions to type of the channels that user choose from options, like `ChannelType.GuildText` choice.

There are more things to know, about `addSubCommand()` and `addSubCommandGroup()` stuff and also `localizations` which we talk about later on. We have learned how to add options and choices to our slash commands. Now we move to the next part on how to retrieve these data using the new way in our execution functions.