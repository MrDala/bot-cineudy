import { SlashCommandBuilder } from "discord.js";
import { ICommand } from "../interfaces/ICommand";
import fs from 'fs/promises';

const root_img = "resources/img/cindy/"
const img_names: string[] = [];

const faceCommand: ICommand = {

	data: new SlashCommandBuilder()
		.setName("face")
		.setDescription("A beautiful picture of Cineudy"),

	async execute(interaction) {

		if (img_names.length === 0) {
			try {
				const files: string[] = await fs.readdir(root_img);
				img_names.push(...files);
			} catch (err) {
				console.error('Erreur lors de la lecture du dossier :', err);
			}
		}

		if (img_names.length === 0) {
			await interaction.reply("No picture of Cineudy 😱");
		} else {
			const random_index = Math.floor(Math.random() * img_names.length);
			const img_name = img_names[random_index];

			await interaction.reply({
				files: [{
					attachment: root_img + img_name,
					name: 'Cindy.png'
				}]
			});
		}
	},
};

module.exports = faceCommand;