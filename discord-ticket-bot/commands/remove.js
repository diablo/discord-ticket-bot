const Discord = require('discord.js')

module.exports = {
	name: 'remove',
	description: 'Ticket bot remove command',
	execute(message) {
		const member2 = message.mentions.members.first();
		if (!member2) return message.channel.send('You didn\'t mention a valid user or the user isn\'t in the server.');
		if (!message.channel.name.startsWith('ticket-')) return message.channel.send('You may not remove a member from the ticket outside the ticket channel.');

		message.channel.updateOverwrite(member2, {

			VIEW_CHANNEL: false,
			SEND_MESSAGES: false,
			READ_MESSAGE_HISTORY: false
		})

		const removeemb = new Discord.MessageEmbed()
		.setColor('#ffccff')
		.setDescription(`${member2.user} has been removed from the ticket.`)
		message.channel.send(removeemb);
	},
};