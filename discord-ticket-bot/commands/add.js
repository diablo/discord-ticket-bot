const Discord = require('discord.js')

module.exports = {
	name: 'add',
	description: 'Ticket bot add command',
	execute(message) {
		const member = message.mentions.members.first();
		if (!member) return message.channel.send('You didn\'t mention a valid user or the user isn\'t in the server.');
		if (!message.channel.name.startsWith('ticket-')) return message.channel.send('You may not add a member to the ticket outside the ticket channel.');

		message.channel.updateOverwrite(member, {

			VIEW_CHANNEL: true,
			SEND_MESSAGES: true,
			READ_MESSAGE_HISTORY: true
		});

		const addemb = new Discord.MessageEmbed()
		.setColor('#ffccff')
		.setDescription(`${member.user} has been added to the ticket.`)
		message.channel.send(addemb);
	},
};