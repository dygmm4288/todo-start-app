import Loading from "@/components/ui/Loading";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import {
  Animated,
  Easing,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const URL = (lat: number, lon: number, apiKey: string) =>
  `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=kr`;

type Weather = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

export default function Weather() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );
  const [rotation] = useState(new Animated.Value(0));
  const client = useQueryClient();

  const fetchWeather = () => {
    if (!location) return Promise.reject();

    const { latitude, longitude } = location.coords;

    return fetch(
      URL(latitude, longitude, process.env.EXPO_PUBLIC_WEATHER_KEY || ""),
    )
      .then((res) => res.json())
      .then((res) => {
        const result = res.weather[0] as Weather;
        return result;
      });
  };

  const { data: weather, isFetching } = useQuery({
    queryKey: ["weather"],
    queryFn: fetchWeather,
    enabled: !!location,
  });

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }
    getCurrentLocation();
  }, []);

  const rotateInterpolate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const animateTiming = (
    animation: Animated.Value,
    config: Animated.TimingAnimationConfig,
  ): Promise<void> => {
    return new Promise((resolve) => {
      Animated.timing(animation, { ...config }).start(() => {
        resolve();
      });
    });
  };

  const [isAnimating, setAnimating] = useState(false);

  const handleHoverIn = () => {
    if (isAnimating) return;
    setAnimating(true);

    animateTiming(rotation, {
      toValue: 0,
      useNativeDriver: true,
      isInteraction: true,
      easing: Easing.inOut(Easing.ease),
    })
      .then(() => {
        client.invalidateQueries({ queryKey: ["weather"] });
        return animateTiming(rotation, {
          toValue: 1,
          useNativeDriver: true,
          isInteraction: true,
          easing: Easing.inOut(Easing.ease),
        });
      })
      .then(() => {
        return animateTiming(rotation, {
          toValue: 0,
          useNativeDriver: true,
          isInteraction: true,
          easing: Easing.inOut(Easing.ease),
        });
      })
      .then(() => {
        setAnimating(false);
      });
  };

  return (
    <View style={styles.container}>
      <Loading isLoading={isFetching} />
      <View>
        {weather && (
          <Image
            source={{
              uri: `https://openweathermap.org/img/wn/${weather.icon}@2x.png`,
            }}
            width={150}
            height={150}
            alt={weather.description}
          />
        )}
      </View>
      <Text>현재 날씨 : {weather?.description}</Text>
      <View>
        <Pressable onPress={handleHoverIn}>
          <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
            <AntDesign name='reload1' size={24} color='black' />
          </Animated.View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
