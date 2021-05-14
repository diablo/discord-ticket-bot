const Discord = require('discord.js')

module.exports = {
	name: 'setup',
	description: 'Ticket bot setup command',
	execute(message) {
		if (!message.guild.me.hasPermission("ADMINISTRATOR")) return message.channel.send('I have no permissions to run the setup, missing permissions: `ADMINISTRATOR`');
	
		if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('You have no permissions to use this command\nMissing permissions: `ADMINISTRATOR`')
	
		message.channel.send('Starting the setup...').then(message => {
	
	
			if (!message.guild.roles.cache.find(role => role.name === 'Support')) {
				message.guild.roles.create({
					data: {
						name: 'Support',
						color: 'RANDOM'
					}
				}).then(() => {
					const suprole = message.guild.roles.cache.find(role => role.name === 'Support');
	
					// This is where all ticket logs will go
					if (message.guild.channels.cache.find(category => category.name === 'TICKET-LOGS')) {
						console.log('Server already has a ticket logs category')
	
					} else message.guild.channels.create('TICKET-LOGS', {
						type: 'category',
						permissionOverwrites: [{
								id: message.guild.id,
								deny: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY', 'SEND_MESSAGES']
							},
							{
								id: suprole,
								allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
							}
						]
					})
	
					if (message.guild.channels.cache.find(channel => channel.name === 'ticket-logs')) {
						console.log('Server already has a ticket-logs channel')
	
					} else message.guild.channels.create('ticket-logs', 'text').then(channel => {
						let category = message.guild.channels.cache.find(category => category.name === 'TICKET-LOGS');
	
						channel.setParent(category);
					})
	
					// This is where all created tickets will go
					if (message.guild.channels.cache.find(category => category.name === 'TICKETS')) {
						console.log('Server already has a tickets category')
	
					} else message.guild.channels.create('TICKETS', {
						type: 'category',
						permissionOverwrites: [{
								id: message.guild.id,
								deny: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY', 'SEND_MESSAGES']
							},
							{
								id: suprole,
								allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
							}
						]
					})
	
				})
	
			} else console.log('Server already had a Support role')
	
			setTimeout(function() {
				message.edit('Setup completed!')
			}, 3000)
		})
	},
};