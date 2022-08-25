import React, { useContext, useEffect, useState } from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { Card } from "../../components/Card";
import { CardBack } from "../../components/Card/CardBack";
import { CardFront } from "../../components/Card/CardFront";
import { CardSteps } from "../../components/CardSteps";
import { CardContext, CardContextProps } from "../../contexts/card";
import { CardBrand, getCardBrand } from "../../utils/cardBrands";
import { styles } from "./styles";

export const Home = () => {
  const [cardBrand, setCardBrand] = useState(CardBrand.default);

  const { card, cardFrontPosition, cardBackPosition, flipCard, step } =
    useContext(CardContext) as CardContextProps;

  const { number, expiration, holder, securityCode } = card;

  const flipFront = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateY: cardFrontPosition.value,
        },
      ],
    };
  });

  const flipBack = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateY: cardBackPosition.value,
        },
        { scaleX: -1 },
      ],
    };
  });

  useEffect(() => {
    const brand = getCardBrand(number!);

    if (brand) {
      setCardBrand(CardBrand[brand]);
      return;
    }

    setCardBrand(CardBrand.default);
  }, [number]);

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={flipCard}>
        <View style={styles.cardContainer}>
          <Animated.View style={flipFront}>
            <Card cardBrand={cardBrand}>
              <CardFront
                cardNumber={number}
                cardExpiration={expiration}
                cardHolder={holder}
                step={step}
              />
            </Card>
          </Animated.View>
          <Animated.View style={[flipBack, { position: "absolute" }]}>
            <Card cardBrand={cardBrand}>
              <CardBack securityCode={securityCode} />
            </Card>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
      <CardSteps />
    </View>
  );
};
