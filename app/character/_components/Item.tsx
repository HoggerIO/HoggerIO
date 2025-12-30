import { Box, Text } from "@chakra-ui/react";
import { EquippedItem } from "../../_types/types";
import Image from "next/image";
import { getItemQualityColor } from "../../_utils/colors";

interface ItemProps {
  items: EquippedItem[] | undefined;
  slotType: string;
  textOnLeft?: boolean;
  isEra: boolean;
  isFirst?: boolean;
}

export const Item: React.FC<ItemProps> = ({ items, slotType, textOnLeft, isEra, isFirst }) => {
  const item = items?.find((i) => i.slot.type === slotType);
  if (item == null) {
    return (
      <Box
        display={"flex"}
        justifyContent={textOnLeft ? "flex-end" : "flex-start"}
        key={slotType}
        h={54}
      >
        <Image
          unoptimized={true}
          width={54}
          height={54}
          alt="image not found"
          src={
            "https://static.wikia.nocookie.net/wowpedia/images/1/1f/Ui-paperdoll-slot-tabard.png"
          }
        />
      </Box>
    );
  }
  const imgSrc =
    item == null
      ? "https://static.wikia.nocookie.net/wowpedia/images/1/1f/Ui-paperdoll-slot-tabard.png"
      : `https://wow.zamimg.com/images/wow/icons/large/${item.icon}.jpg`;

  const img = (
    <Box
      key={slotType}
      border={"1px solid"}
      borderColor={getItemQualityColor(item.quality.name)}
      w={54}
      h={54}
      flexShrink={0}
      flexGrow={0}
      flexBasis={"auto"}
    >
      <Image unoptimized={true} width={54} height={54} alt="image not found" src={imgSrc} />
    </Box>
  );
  const setBonusItems = item.set?.items.filter((i) => !!i.is_equipped)?.map((i) => i.item.id) ?? [];
  const maybeSetBonus = setBonusItems.length > 0 ? `&pcs=${setBonusItems.join(":")}` : "";
  const gems = item.enchantments?.filter((e) => e.enchantment_slot.id !== 0) ?? [];

  const maybeGem =
    gems.length > 0
      ? `&gems=${gems
          .filter((g) => g.source_item?.id)
          .map((g) => g.source_item?.id)
          .join(":")}`
      : "";

  const enchant = item.enchantments?.find((e) => e.enchantment_slot.id === 0);
  const maybeEnchant = enchant ? `&ench=${enchant.enchantment_id}` : "";
  return (
    <Box w={[215, 215, 315]}>
      <a
        href={`https://${isEra ? "classic" : "mists"}.wowhead.com/item=${
          item.id
        }${maybeSetBonus}${maybeEnchant}${maybeGem}`}
        target="_blank"
      >
        <Box
          display={"flex"}
          justifyContent={textOnLeft ? "flex-end" : "flex-start"}
          key={slotType}
          h={54}
          gap={"5px"}
        >
          {!textOnLeft && img}
          <Box alignSelf={"center"}>
            <Text
              whiteSpace={"normal"}
              textOverflow={"ellipsis"}
              fontSize={"small"}
              fontWeight={400}
              overflow={"hidden"}
              alignSelf={"center"}
              flex={1}
              textAlign={textOnLeft ? "end" : "start"}
              textColor={getItemQualityColor(item.quality.name)}
              overflowWrap={"break-word"}
            >
              {item.name}
            </Text>
            <Text fontSize={"small"} textAlign={textOnLeft ? "end" : "start"}>
              {item.itemLevel}
            </Text>
          </Box>

          {textOnLeft && img}
        </Box>
      </a>
    </Box>
  );
};
