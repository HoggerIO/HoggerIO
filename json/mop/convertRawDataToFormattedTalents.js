const fs = require("fs");
const path = require("path");

// load your raw data
const raw = require("./rawData.json"); // adjust to your filename/path

// Assuming raw has keys:
//   raw.glyphs = [ { classId, spellId, itemId, name, icon, … }, … ]
//   raw.talents = { classId: { specId: [talentIds…], … }, … }
//   raw.talentDetails = { talentId: { name_enus, icon, … }, … }  // your second object

const { glyphs, talents, talentDetails } = raw;

function buildClassData(classId) {
  // Filter glyphs for this class
  const classGlyphs = glyphs
    .filter((g) => g.classId === Number(classId))
    .reduce((map, g) => {
      map[g.name] = {
        id: g.itemId || g.spellId, // choose whichever you prefer as unique id
        icon: g.icon,
        type: g.glyphType,
      };
      return map;
    }, {});

  // For talents: choose one of the spec arrays (they all same tree per class in MoP)
  const classTalentLists = talents[classId];
  if (!classTalentLists) {
    console.warn(`No talents found for classId ${classId}`);
  }

  // pick first spec ID's list
  const firstSpecId = Object.keys(classTalentLists)[0];
  const talentIds = classTalentLists[firstSpecId];

  const classTalents = talentIds.map((id) => {
    const detail = talentDetails[id];
    if (!detail) {
      console.warn(`No detail found for talent id ${id}`);
      return { id, icon: null, name: null };
    }
    return {
      id: Number(id),
      icon: detail.icon,
      name: detail.name_enus || detail.name, // fallback if your structure differs
    };
  });

  return {
    glyphs: classGlyphs,
    talents: classTalents,
  };
}

// iterate all classIds present in your data
Object.keys(talents).forEach((classId) => {
  const data = buildClassData(classId);
  const outPath = path.join(__dirname, `class_${classId}.json`);
  fs.writeFileSync(outPath, JSON.stringify(data, null, 2), "utf8");
  console.log(`Written class ${classId} data to ${outPath}`);
});
