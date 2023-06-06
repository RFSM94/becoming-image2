import { Text } from "@react-three/drei";
import { fadeOnBeforeCompileFlat } from "../utils/fadeMaterial";

export const TextSection = ({ title, subtitle, ...props }) => {
  return (
    <group {...props}>
      {!!title && (
        <Text
          color="white"
          anchorX="center"
          anchorY="center"
          fontSize={0.52}
          maxWidth={4}
          lineHeight={1}
          font="./fonts/CircularStd-Book.ttf"
          textAlign="center"
        >
          {title}
          <meshStandardMaterial
            color="white"
            onBeforeCompile={fadeOnBeforeCompileFlat}
          />
        </Text>
      )}

      <Text
        color="white"
        anchorX="center"
        anchorY="center"
        fontSize={0.2}
        maxWidth={4}
        font="./fonts/CircularStd-Book.ttf"
        textAlign="center"
      >
        {subtitle}
        <meshStandardMaterial
          color="white"
          onBeforeCompile={fadeOnBeforeCompileFlat}
        />
      </Text>
    </group>
  );
};
