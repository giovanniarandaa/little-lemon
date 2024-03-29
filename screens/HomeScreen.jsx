import React, { useEffect, useState } from "react";
import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { filterMenuItems, selectAllMenu } from "../database";
import { debounce } from "../utils/debounce";

export const HomeScreen = () => {
  const [searchInput, setSearchInput] = useState("");
  const [activeFilters, setActiveFilters] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [filterCategories, setFilterCategories] = useState([]);

  const loadMenu = async () => {
    try {
      const menuItems = await selectAllMenu();
      setMenuItems(menuItems);
      // This code makes it so that the item categories are dynamic and will auto-populate if a new category is added.
      setFilterCategories([
        ...new Set(
          menuItems?.map(
            (i) => i.category?.charAt(0).toUpperCase() + i.category?.slice(1)
          )
        ),
      ]);
    } catch (err) {
      console.error(`There was an error selecting all menu items: ${err}`);
    }
  };

  const onFilterClick = (item) => {
    const indexOfItem = activeFilters.indexOf(item);
    if (indexOfItem > -1) {
      const newActiveFilters = activeFilters.filter(
        (_, index) => index !== indexOfItem
      );
      setActiveFilters(newActiveFilters);
    } else {
      setActiveFilters((activeFilters) => [...activeFilters, item]);
    }
  };

  const filterMenu = () =>
    filterMenuItems(activeFilters, searchInput).then(setMenuItems);

  useEffect(() => {
    loadMenu();
  }, []);

  useEffect(() => {
    filterMenu();
  }, [activeFilters]);

  useEffect(() => {
    const debouncedFilterMenu = debounce(filterMenu, 500);
    debouncedFilterMenu();
  }, [searchInput]);

  return (
    <View style={styles.homeContainer}>
      <View style={styles.heroSection}>
        <Text style={styles.heroLL}>Little Lemon</Text>
        <Text style={styles.heroChicago}>Chicago</Text>
        <View style={styles.heroDescImageContainer}>
          <Text style={styles.heroDescription}>
            We are a family owned Mediterranean restaurant, focused on
            traditional recipes served with a modern twist.
          </Text>
          <Image
            source={require("../img/heroImage.png")}
            style={styles.heroImage}
          />
        </View>
        <View style={styles.searchBarContainer}>
          <Image
            source={require("../img/searchIcon.png")}
            style={styles.searchIcon}
          />
          <TextInput style={styles.searchInput} onChangeText={setSearchInput} />
        </View>
      </View>
      <View style={styles.filtersContainer}>
        <Text style={styles.filterTitle}>ORDER FOR DELIVERY!</Text>
        <ScrollView style={styles.filterScrollView} horizontal>
          {filterCategories.map((item, index) => {
            const isSelected = activeFilters.indexOf(item) > -1;
            return (
              <Pressable
                style={{
                  ...styles.filterButton,
                  backgroundColor: isSelected ? '#495E57' : '#EDEFEE',
                }}
                key={index}
                onPress={() => onFilterClick(item)}
              >
                <Text
                  style={{
                    ...styles.filterButtonText,
                    color: isSelected ? '#EDEFEE' : '#495E57',
                  }}
                >
                  {item}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
      <FlatList
        data={menuItems}
        renderItem={({ item }) => {
          return (
            <View style={styles.menuItem}>
              <View style={styles.menuDetails}>
                <Text style={styles.itemTitle}>{item.name}</Text>
                <Text numberOfLines={2} style={styles.itemDescription}>
                  {item.description}
                </Text>
                <Text style={styles.itemPrice}>${item.price}</Text>
              </View>
              <View style={styles.itemImageContainer}>
                <Image source={{ uri: item.image }} style={styles.menuImage} />
              </View>
            </View>
          );
        }}
        keyExtractor={(item, index) => item.name + index}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 0.5,
              width: "90%",
              backgroundColor: "grey",
              alignSelf: "center",
            }}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    backgroundColor: "white",
    flex: 1,
    position: "relative",
    justifyContent: "center",
  },
  heroSection: {
    backgroundColor: "#495E57",
    height: 300,
    padding: 20,
    position: "relative",
    overflow: "hidden",
  },
  heroLL: { fontSize: 45, color: "#F4CE14" },
  heroChicago: { fontSize: 30, color: "#EDEFEE" },
  heroDescImageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  heroDescription: {
    fontSize: 15,
    color: "#EDEFEE",
    maxWidth: 200,
    marginTop: 10,
  },
  heroImage: {
    height: 130,
    width: 120,
    marginTop: -30,
    borderRadius: 20,
  },
  filtersContainer: {
    padding: 20,
    paddingRight: -20,
    borderBottomColor: "#333333",
  },
  filterTitle: {
    fontWeight: "900",
  },
  filterScrollView: { marginTop: 20, display: "flex" },
  filterButton: {
    color: "#333333",
    borderRadius: 10,
    marginRight: 12,
  },
  filterButtonText: {
    padding: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  menuItem: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 5,
  },
  menuDetails: { flex: 1, gap: 10 },
  itemTitle: { fontWeight: "bold" },
  itemDescription: {},
  itemPrice: { fontWeight: "500" },
  itemImageContainer: { width: 100, height: 100, backgroundColor: "black" },
  menuImage: {
    resizeMode: "cover",
    width: 100,
    height: 100,
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginTop: 20,
  },
  searchInput: {
    flex: 1,
    height: 50,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
});
