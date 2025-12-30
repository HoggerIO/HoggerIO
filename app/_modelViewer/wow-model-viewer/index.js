"use client";
import "../mop_model_viewer.js";
import { WowModelViewer } from "./wow_model_viewer.js";
import { findRaceGenderOptions, optionsFromModel } from "./character_modeling.js";
import jQuery from "jquery";

/**
 *
 * @param aspect {number}: Size of the character
 * @param containerSelector {string}: jQuery selector on the container
 * @param model {{}|{id: number, type: number}}: A json representation of a character
 * @returns {Promise<WowModelViewer>}
 */
export async function generateModels(aspect, containerSelector, model, contentPath) {
  let modelOptions;
  let fullOptions;

  const { race, gender } = model;

  // CHARACTER OPTIONS
  // This is how we describe a character properties
  fullOptions = await findRaceGenderOptions(race, gender, contentPath);
  modelOptions = optionsFromModel(model, fullOptions);

  const models = {
    type: 2,
    contentPath,
    // eslint-disable-next-line no-undef
    container: jQuery(containerSelector),
    aspect: aspect,
    hd: true,
    ...modelOptions,
  };

  // eslint-disable-next-line no-undef
  const wowModelViewer = await new WowModelViewer(models);
  if (fullOptions) {
    wowModelViewer.currentCharacterOptions = fullOptions;
    wowModelViewer.characterGender = model.gender;
    wowModelViewer.characterRace = model.race;
  }
  return wowModelViewer;
}
