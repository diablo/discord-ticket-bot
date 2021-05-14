const Discord = require('discord.js')

module.exports = {
	name: 'close',
	description: 'Ticket bot close command',
	execute(message) {
		if (!message.channel.name.startsWith('ticket-')) return message.channel.send('You may not use the close command outside the ticket channel!');
		const reason = message.content.split(' ').slice(1).join(' ');
		if (!reason) return message.channel.send('Please provide a reason to close the ticket.');
		let author = message.channel.name.replace('ticket-', '');
		author = client.users.cache.get(author);

		message.channel.send('To confirm, type `yes`, otherwise this message will be deleted in 10 seconds and the close action will be canceled.').then(message => {

				message.channel.awaitMessages(response => response.content === 'yes', {

					max: 1,

					time: 10000,

					errors: ['time'],

				}).then(async collected => {

						message.channel.messages.fetch({ limit: 100 }).then(async fetched => {

							fetched = fetched.array().reverse();
							const mapped = fetched.map(message => `${message.author.tag}: ${message.content}`).join('\n');
							const tlogs = new Discord.MessageAttachment(Buffer.from(mapped), 'ticket.txt');

							const embed = new Discord.MessageEmbed()
						  	.setColor('#ffccff')
							.setTitle('Your ticket has been closed')
							.setDescription('Ticket message list:')
							author.send(embed);
							author.send(tlogs);

							let logchannel = message.guild.channels.cache.find(channel => channel.name === 'ticket-logs');
							if (!logchannel) return console.log('You currently have no logs channel, run the `>setup` command to set up the bot.')

							const closeemb = new Discord.MessageEmbed()
							.setColor('#ffccff')
							.setTitle('✉️ Ticket Closed')
							.addField('Created by:', author)
							.addField('Closed by:', message.author.tag)
							.addField('Reason:', reason)
							await logchannel.send(closeemb);


						});

						message.channel.delete();

				})

					.catch(() => {

						message.edit('The ticket wasn\'t closed due to choice timeout.').then(message => {

							message.delete({ timeout: 5000 });

						}, 3000);

					});

		});
	},
};