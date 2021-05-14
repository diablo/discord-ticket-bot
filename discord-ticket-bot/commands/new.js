const Discord = require('discord.js')

module.exports = {
	name: 'new',
	description: 'Ticket bot new command',
	execute(message) {
        if (!message.guild.channels.cache.find(category => category.name === 'TICKETS')) return message.channel.send('The server is missing the TICKETS category, run the `>setup` command to set up the bot.')
		if (!message.guild.roles.cache.find(suprole => suprole.name === 'Support')) return message.channel.send('The server requires a support role for me to open a ticket.\nIf you\'re an administrator, create a role with the name `Support` and give it to users who are allowed to see tickets.');
		if (message.guild.channels.cache.find(channel => channel.name === `ticket-${message.author.id}`)) return message.channel.send(`You already have an opened ticket, please close the current one to open a new one.`);

		message.guild.channels.create(`ticket-${message.author.id}`, 'text').then(channel => {

			let category = message.guild.channels.cache.find(category => category.name === 'TICKETS')

			channel.setParent(category).then(suprole => {

		   const suprole2 = message.guild.roles.cache.find(r => r.name === 'Support'); // @Support role
		   const everyone = message.guild.roles.cache.get(message.guild.id); // @everyone role

			suprole.updateOverwrite(suprole2, {

				VIEW_CHANNEL: true,
				SEND_MESSAGES: true,
				READ_MESSAGE_HISTORY: true,

			});

			suprole.updateOverwrite(everyone, {

				VIEW_CHANNEL: false,
				SEND_MESSAGES: false,
				READ_MESSAGE_HISTORY: false

			});

			suprole.updateOverwrite(message.author, {

				VIEW_CHANNEL: true,
				SEND_MESSAGES: true,
				EMBED_LINKS: true,
				ATTACH_FILES: true,
				READ_MESSAGE_HISTORY: true

			});

			const createemb = new Discord.MessageEmbed()
			.setColor('#ffccff')
			.setDescription(`✉️ Your ticket has been created in ${suprole}`)
			message.channel.send(createemb);

			const embed = new Discord.MessageEmbed()
			.setColor('#ffccff')
			.addField(`Hello ${message.author.username}`, 'Please try to explain why you opened this ticket with as many details as possible.\n\nOur **Support** team will be here soon to help.')
			.setTimestamp()
			suprole.send(`${suprole2}`)
			suprole.send({ embed: embed })
			suprole.send(`<@${message.author.id}>`).then(async message => {
				await message.delete({ timeout: 500 })
			})

		}).catch(console.error);

	})
	},
};