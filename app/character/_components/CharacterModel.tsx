"use client";
import { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { EquippedItem } from "../../_types/types";

interface Character {
  race: number;
  gender: number;
  skin: number;
  face: number;
  hairStyle: number;
  hairColor: number;
  facialStyle: number;
  items: [number, string][];
}
const BaseCharacter: Character = {
  race: 1,
  gender: 0,
  skin: 4,
  face: 0,
  hairStyle: 5,
  hairColor: 5,
  facialStyle: 5,
  items: [],
};

const SlotTypeToNumber: { [type: string]: number } = {
  HEAD: 1,
  SHOULDER: 3,
  CHEST: 5,
  WAIST: 6,
  LEGS: 7,
  FEET: 8,
  WRIST: 9,
  HANDS: 10,
  BACK: 16,
  ROBE: 20,
  MAIN_HAND: 21,
  OFF_HAND: 22,
  TABARD: 19,
};

interface CharacterModelProps {
  items: EquippedItem[];
  race: number;
  gender: number;
  modelType: string;
}
export const CharacterModel: React.FC<CharacterModelProps> = ({
  items,
  race,
  gender,
  modelType,
}) => {
  useEffect(() => {
    async function loadVisualCharacter() {
      try {
        // If not await loading here we run into a document is not defined error
        const modelViewerModule = await import("../../_modelViewer/wow-model-viewer/index.js");
        const characterModel = { ...BaseCharacter };
        characterModel.race = race;
        characterModel.gender = gender;

        items.forEach((item) => {
          // If the inventory_type is ROBE set the sloteType to robe, otherwise it will be CHEST and have the wrong slot id
          const slot =
            item.inventory_type === "ROBE"
              ? SlotTypeToNumber["ROBE"]
              : SlotTypeToNumber[item.slot.type];
          if (slot != null) {
            const displayId = item.displayId?.toString();
            if (displayId != null) {
              characterModel.items.push([slot, displayId]);
            }
          }
        });

        await modelViewerModule.generateModels(
          1,
          `#model_3d`,
          characterModel,
          process.env.NEXT_PUBLIC_CONTENT_PATH + `/modelviewer/${modelType}/`
        );
      } catch (e) {
        console.error("Error", e);
      }
    }
    loadVisualCharacter();
    // We intentionally only want to run this onceon mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Box
        height={["450px", "450px", "450px"]}
        width={["450px", "450px", "450px"]}
        borderWidth="1px"
        borderRadius="lg"
        backgroundColor="rgb(43, 43, 43)"
        mb={2}
      >
        <div id="model_3d"></div>
      </Box>
    </>
  );
};
