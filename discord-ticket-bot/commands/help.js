const Discord = require('discord.js')

module.exports = {
	name: 'help',
	description: 'Ticket bot help command',
	execute(message) {
		const helpemb = new Discord.MessageEmbed()
		.setColor('#ffccff')
		.setTitle('✉️ Commands')
		.setDescription('**Run the `>setup` command to setup the bot**')
		.addField('`>new`', 'Creates a ticket') // "true" displays the field in line
		.addField('`>add`', 'Add someone to the ticket')
		.addField('`>remove`', 'Remove someone from the ticket')
		.addField('`>close`', 'Close the ticket')
		.setTimestamp()
		message.channel.send(helpemb);
	},
};