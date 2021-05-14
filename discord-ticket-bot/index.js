const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs')
const { token, prefix } = require("./config.json");

client.commands = new Discord.Collection
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on('ready', () => {
	console.log("Launching the ticket bot...");
	console.log(`Logged in as ${client.user.tag}`);
	client.user.setActivity('github.com/diablo', { type: 'PLAYING' }); // You may change the status to 'PLAYING' 'WATCHING' or 'STREAMING'
});

client.on('message', message => {
	if (!message.content.startsWith(prefix)) return;
	if (message.author.bot) return;
	if (!message.guild) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args);
	} catch (error) {
		console.error(error);
	}
})

client.login(token);
