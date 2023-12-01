var grid = {
  name: "4x4",
  defaultType: "Grass",
  grid: [],
  northborder: "none",
  southborder: "none",
  eastborder: "none",
  westborder: "none",
};

var exportGrid = {
  name: "export",
  defaultType: "Grass",
  grid: [],
  northborder: "none",
  southborder: "none",
  eastborder: "none",
  westborder: "none",
};

var templateGrid = {
  name: "export",
  defaultType: "Grass",
  grid: [],
  northborder: "none",
  southborder: "none",
  eastborder: "none",
  westborder: "none",
};

const borderTypes = [
  "none",
  "River",
  "Ocean",
  "Mountains",
  "Desert",
  "Forest",
  "Plains"
];
const biomes = ["Forest", "Plains", "Desert"];
const borders = ["northborder", "westborder", "southborder", "eastborder"];
const excludedBuildings = ["Air_Cargo", "Gift_Drone", "Construction_Site"];
const passiveTypes = [
  "Water",
  "Shady",
  "Energy",
  "Dirty",
  "Salty",
  "Crude_Oil",
  "Barn_Feed",
  "Barn_Water",
  "Cabernet_Grapes",
  "Chardonnay_Grapes",
  "Chromium",
  "Clay_Lump",
  "Cocoa",
  "Cold",
  "Copper",
  "Copper_Ore",
  "Corn",
  "Cotton",
  "Eggs",
  "Gold",
  "Gold_Ore",
  "Iron",
  "Limestone",
  "Nectar",
  "Peppermint",
  "PositiveOnlySalty",
  "Pinot_Noir_Grapes",
  "Pumpkin",
  "Sandy",
  "Seaweed",
  "Silica",
  "Silver",
  "Silver_Ore",
  "Strawberries",
  "Sugarcane",
  "Water_Drum",
  "Wheat",
];

var overlayMode = "none";
var dimension = 16;
var selected = "";
var selectedBuilding = "";
var biome = "Forest";
var direction = "north";

delete townstarObjects.Ancient_Tesla_Coil;
delete townstarObjects.K_Barter_Station;
delete townstarObjects.B_Barter_Station;

// Extra modification
townstarObjects.Paved_Road.EdgeRequirements = "None";

const defaultTownGuideFilename = 'TownGuideBuild';
const localLayoutName = 'visualizer_layout';
const appliedNftsName = 'applied_nfts';
let canUpdateLocalLayout = false;
let selectedCategory = "Farm";
let appliedNfts = [];
let selectedCraft = "";
let craftChecked = false;
const maxRequirement = 4;
const appliedUtilities = {};

const correctionNames = {
  "CGW_Commemorative": "Common_Ground_Theatre",
  "Trick_or_Treat_Bag": "Trick-or-Treat_Bag",
  "Panner_Bunker_House": "Panner_Bunk_House",
  "Master_Copper_Smith": "Platinum_Master_Copper_Smith",
  "Copper_Smith": "Epic_Copper_Smith",
  "Hatched_Hank_Jr": "Hatched_Hank_Jr's",
  "Cheese_Pizza": "Four-Cheese_Pizza",
  "Tomatoes": "Tomato",
  "Wild_Salmon": "Salmon",
  "Oopsie_'23": "Mayhem_-_Oopsie_'23",
  "Nourish_Milk": "Milk",
  "Four_Cheese_Pizza": "Four-Cheese_Pizza",
}

const setup = {
  // Ornaments
  "ornaments": {
    "Ornament_One_Holiday_Tree_Card": {
      "name": "Ornament 1 (Wages -8%)",
    },
    "Ornament_Two_Holiday_Tree_Card": {
      "name": "Ornament 2 (Wages -3.5%)",
    },
    "Ornament_Three_Holiday_Tree_Card": {
      "name": "Ornament 3 (Cost -2%)",
    },
    "Ornament_Four_Holiday_Tree_Card": {
      "name": "Ornament 4 (Wages -1.5%)",
    },
    "Ornament_Five_Holiday_Tree_Card": {
      "name": "Ornament 5 (Cost -9%)",
    },
    "Ornament_Six_Holiday_Tree_Card": {
      "name": "Ornament 6 (Cost -5%)",
    },
    "Ornament_Seven_Holiday_Tree_Card": {
      "name": "Ornament 7 (Wages -1.5%)",
    },
    "Ornament_Eight_Holiday_Tree_Card": {
      "name": "Ornament 8 (Cost -2%)",
    },
    "Ornament_Nine_Holiday_Tree_Card": {
      "name": "Ornament 9 (Cost -5%)",
    },
    "Ornament_Ten_Holiday_Tree_Card": {
      "name": "Ornament 10 (Wages -4%)",
    },
    "Ornament_Eleven_Holiday_Tree_Card": {
      "name": "Ornament 11 (Cost -2%)",
    },
    "Ornament_Twelve_Holiday_Tree_Card": {
      "name": "Ornament 12 (Wages -1.5%)",
    },
  },
  // Blueprints
  "blueprints": {
    "Blueprint_Thrifty_Foundry_Luxury": {
      "name": "Luxury (Cost -40%, Requirement -40%)",
    },
    "Blueprint_Thrifty_Foundry_Platinum": {
      "name": "Platinum (Cost -35%, Requirement -40%)",
    },
    "Blueprint_Thrifty_Foundry_Legendary": {
      "name": "Legendary (Cost -30%, Requirement -40%)",
    },
    "Blueprint_Thrifty_Foundry_Epic": {
      "name": "Epic (Cost -25%, Requirement -40%)",
    },
    "Blueprint_Thrifty_Foundry_Rare": {
      "name": "Rare(Cost -20%, Requirement -40%)",
    },
    "Blueprint_Thrifty_Foundry_Uncommon": {
      "name": "Uncommon (Cost -15%, Requirement -40%)",
    },
    "Blueprint_Thrifty_Foundry_Common": {
      "name": "Common (Cost -10%, Requirement -40%)",
    },
  },
  // Others
  "others": {
    "Galaverse_in_the_Mediterranean_Sea": {
      "name": "Galaverse 2022 (Wages -30%)",
    },
  },
};

const originalNFTProximityBonuses = {
  "Rare_Water_Pump": [3],
  "Haunted_Maze": {
    "Haunted_Maze_-_Zone_1": [3, 2, 1],
    "Haunted_Maze_-_Zone_2": [2, 1],
    "Haunted_Maze_-_Zone_3": [3, 3],
    "Haunted_Maze_-_Zone_4": [1]
  },
  "Diamond_Water_Pump": {
    "Rare_Grand_Aquifer": [1],
    "Water_Pump": [1],
    "Diamond_Water_Pump": [2],
    "Rare_Water_Pump": [3]
  },
  "Diamond_Charge_Station": {
    "Solar_Panel": [1],
    "Rare_Solar_Panel": [2, 1],
    "Legendary_Solar_Panel": [4, 3, 2, 1],
    "Tesla_Coil": [1],
    "Rare_Tesla_Coil": [2, 1],
    "Legendary_Tesla_Coil": [4, 3, 2, 1],
    "Nuclear_Power": [4, 3, 2, 1],
    "Power_Plant": [3, 2, 1]
  },
  "Platinum_Master_Copper_Smith": {
    "Platinum_Master_Copper_Smith": [1],
  },
  "Panner_Brother": {
    "Cooper": [1],
    "Goldy": [1],
    "Sylvester": [1]
  },
  "Panner": {
    "Panner_Bunk_House": [2, 1],
    "Panner_House": [1],
    "Rose_&_Lily": [1],
  },
  "Legendary_Nourish_Barn": [3],
};

const boostedNftProximityBonuses = {
  "Haunted_Maze": {
    "Haunted_Maze_-_Zone_1": [6, 5, 4, 3, 2, 1],
    "Haunted_Maze_-_Zone_2": [4, 3, 2, 1],
    // "Haunted_Maze_-_Zone_3": [4, 4, 4, 4],
    // Custom maze3 modification to match Godot.
    "Haunted_Maze_-_Zone_3": [6, 6, 6, 6],
    "Haunted_Maze_-_Zone_4": [2, 1]
  },
  "Diamond_Water_Pump": {
    "Rare_Grand_Aquifer": [2, 1],
    "Water_Pump": [2],
    "Diamond_Water_Pump": [2],
    "Rare_Water_Pump": [6]
  },
  "Diamond_Charge_Station": {
    "Solar_Panel": [2, 1],
    "Rare_Solar_Panel": [4, 3, 2, 1],
    "Legendary_Solar_Panel": [8, 7, 6, 5, 4, 3, 2, 1],
    "Tesla_Coil": [2, 1],
    "Rare_Tesla_Coil": [4, 3, 2, 1],
    "Legendary_Tesla_Coil": [8, 7, 6, 5, 4, 3, 2, 1],
    "Nuclear_Power": [8, 7, 6, 5, 4, 3, 2, 1],
    "Power_Plant": [6, 5, 4, 3, 2, 1]
  },
  "Platinum_Master_Copper_Smith": {
    "Platinum_Master_Copper_Smith": [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  },
  "Panner_Brother": {
    "Cooper": [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    "Goldy": [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    "Sylvester": [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
  },
  "Panner": {
    "Panner_Bunk_House": [0],
    "Panner_House": [0],
    "Rose_&_Lily": [0],
  }
};

const boostedNftProximityEffects = {
  "Haunted_Maze": {
    "Haunted_Maze_-_Zone_1": ["Nectar"],
    "Haunted_Maze_-_Zone_2": ["Clay_Lump"],
    "Haunted_Maze_-_Zone_3": ["PositiveOnlySalty"],
    "Haunted_Maze_-_Zone_4": ["Nectar"]
  },
  "Diamond_Water_Pump": {
    "Rare_Grand_Aquifer": ["Water_Drum"],
    "Water_Pump": ["Water_Drum"],
    "Diamond_Water_Pump": ["Water_Drum"],
    "Rare_Water_Pump": ["Water_Drum"]
  },
  "Diamond_Charge_Station": {
    "Solar_Panel": ["Energy"],
    "Rare_Solar_Panel": ["Energy"],
    "Legendary_Solar_Panel": ["Energy"],
    "Tesla_Coil": ["Energy"],
    "Rare_Tesla_Coil": ["Energy"],
    "Legendary_Tesla_Coil": ["Energy"],
    "Nuclear_Power": ["Energy"],
    "Power_Plant": ["Energy"]
  },
  "Platinum_Master_Copper_Smith": {
    "Platinum_Master_Copper_Smith": ["Copper"],
  },
  "Panner_Brother": {
    "Cooper": ["Copper_Ore"],
    "Goldy": ["Gold_Ore"],
    "Sylvester": ["Silver_Ore"]
  },
  "Panner": {
    "Panner_Bunk_House": ["Shady"],
    "Panner_House": ["Shady"],
    "Rose_&_Lily": ["Shady"],
  }
};

const mazeSets = Object.keys(originalNFTProximityBonuses.Haunted_Maze);
function IsFullMazeSets() {
  let maze1 = false,
      maze2 = false,
      maze3 = false,
      maze4 = false;
  Object.values(grid.grid).forEach(({type: type}) => {
    if (type == "Haunted_Maze_-_Zone_1") {
      maze1 = true;
    } else if (type == "Haunted_Maze_-_Zone_2") {
      maze2 = true;
    } else if (type == "Haunted_Maze_-_Zone_3") {
      maze3 = true;
    } else if (type == "Haunted_Maze_-_Zone_4") {
      maze4 = true;
    }
  });

  return maze1 && maze2 && maze3 && maze4;
}

const diamondWaterPump = Object.keys(originalNFTProximityBonuses.Diamond_Water_Pump);
function IsDiamondWaterPump() {
  let valid = false;
  Object.values(grid.grid).forEach(({type: type}) => {
    if (type == "Diamond_Water_Pump") {
      valid = true;
    }
  });

  return valid;
}

const diamondChargeStation = Object.keys(originalNFTProximityBonuses.Diamond_Charge_Station);
function IsDiamondChargeStation() {
  let valid = false;
  Object.values(grid.grid).forEach(({type: type}) => {
    if (type == "Diamond_Charge_Station") {
      valid = true;
    }
  });

  return valid;
}

const pannerSets = Object.keys(originalNFTProximityBonuses.Panner);
function IsFullPannerBrotherSets() {
  let cooper = false,
      goldy = false,
      sylvester = false;
  Object.values(grid.grid).forEach(({type: type}) => {
    if (type == "Cooper") {
      cooper = true;
    } else if (type == "Goldy") {
      goldy = true;
    } else if (type == "Sylvester") {
      sylvester = true;
    }
  });

  return cooper && goldy && sylvester;
}

const applyOnceBuildings = [
  "Platinum_Master_Copper_Smith",
  "Cooper",
  "Goldy",
  "Sylvester",
];

const selfProximityBuildings = [
  "Legendary_Nourish_Barn",
];

const iconUrls = {
  "categoryFarm": "https://i.imgur.com/CqyWzXE.png",
  "categoryFishing": "https://i.imgur.com/mx3Ng8Y.png",
  "categoryIndustrial": "https://i.imgur.com/xEv8aiA.png",
  "categoryJewelry": "https://i.imgur.com/Ub5rptw.png",
  "categoryRanch": "https://i.imgur.com/Ad5071e.png",
  "categoryTerrain": "https://i.imgur.com/B0aLlsc.png",
  "categoryTrade": "https://i.imgur.com/jYatpFh.png",
  "remove": "https://i.imgur.com/lT5gf4m.png",
}

const timerGrade = [
  "besttimer",
  "oktimer",
  "badtimer",
  "worsttimer"
];

const ingredientBranches = {
  "Water": {
    "Barn_Water": [
      "Fancy_Barn",
      "Legendary_Nourish_Barn",
      "Milk_Barn",
    ],
  },
  "Feed": {
    "Barn_Feed": [
      "Fancy_Barn",
      "Legendary_Nourish_Barn",
      "Milk_Barn",
    ],
  },
};

function initialize() {
  loadTemplateGrid();
  loadGrid();
  renderGrid();
  renderBuildingMenu();
  renderOverlaysOptions();
  renderBiomeOptions();
  renderBorders();
}

function firstInitialize() {
  initialize();
  LoadEdgeNumbering();
  LoadBuildingSearch();
  LoadInfoContent();
  LoadVisualizerAddonByTruckTonkaAndLowCat();
  LoadTownGuideEuSupport();
  LoadStagesSupport();
  LoadNewLayoutButton();

  canUpdateLocalLayout = true;

  const layout = localGetValue(localLayoutName);

  if (layout) {
    document.querySelector('#importexport').value = JSON.stringify(layout);
    importGrid();
  } else {
    LoadStages();
  }
  RightClickRemoveBuilding();
  showCategoryMenu(selectedCategory);
}

function LoadInfoContent() {
  const infoContainer = document.createElement('div');
  infoContainer.id = 'info-container';
  infoContainer.classList.add('tileinfobody');

  const tabContainer = document.createElement('div');
  tabContainer.id = 'tab-container';
  infoContainer.appendChild(tabContainer);

  const infoContentContainer = document.createElement('div');
  infoContentContainer.id ='info-content-container';
  infoContainer.appendChild(infoContentContainer);

  document.querySelector('.maincontainer').appendChild(infoContainer);

  LoadLayoutTab();
  LoadCalculationTab();
  LoadSetupTab();
}

function GetTabContainerElement() {
  return document.querySelector('#tab-container');
}

function GetInfoContentContainer() {
  return document.querySelector('#info-content-container');
}

function GetSetupContainerContentContainer() {
  return document.querySelector('#setup-container-content-container');
}

function LoadLayoutTab() {
  // Tab
  const tab = document.createElement('div');
  tab.id = 'layout-tab';
  tab.classList.add('selected');
  tab.textContent = 'Layout';
  tab.onclick = function() { ShowInfoLayoutContent(); };
  const tabContainer = GetTabContainerElement();
  tabContainer.appendChild(tab);

  // Content
  const container = document.createElement('div');
  container.id = 'layout-container';
  const contentContainer = GetInfoContentContainer();
  contentContainer.appendChild(container);
}

function LoadCalculationTab() {
  // Tab
  const tab = document.createElement('div');
  tab.id = 'calculation-tab';
  tab.textContent = 'Calculation';
  tab.onclick = function() {
    // For testing many ingredients product.
    // document.querySelector('#product-rate-product-select').value = 'Stack_Box';
    // For testing many ingredients product.
    // ShowProductRate();
    ShowInfoCalculationContent();
  };
  const tabContainer = GetTabContainerElement();
  tabContainer.appendChild(tab);

  // Content
  const container = document.createElement('div');
  container.id = 'calculation-container';
  container.style.display = 'none';

  const productRateContainer = document.createElement('div');
  productRateContainer.id = 'product-rate-container';

  const productRateTitle = document.createElement('div');
  productRateTitle.id = 'product-rate-title';
  productRateTitle.classList.add('title');
  productRateTitle.textContent = 'Product Requirements Rate';
  productRateContainer.appendChild(productRateTitle);

  const productRateProduct = document.createElement('div');
  productRateProduct.id = 'product-rate-product';

  const productRateProductSelect = document.createElement('select');
  productRateProductSelect.id = 'product-rate-product-select';
  productRateProductSelect.onchange = function() { ShowProductRate(); };

  const option = document.createElement('option');
  option.value = '';
  option.textContent = '-- Select a Product --';
  productRateProductSelect.appendChild(option);

  const productNames = Object.keys(recipes);
  productNames.sort();
  for (const name of productNames) {
    const option = document.createElement('option');
    option.value = name;
    option.textContent = getPrettyName(name);
    productRateProductSelect.appendChild(option);
  }
  productRateProduct.appendChild(productRateProductSelect);
  productRateContainer.appendChild(productRateProduct);

  const productRateProductRate = document.createElement('div');
  productRateProductRate.id = 'product-rate-product-rate';

  const productRateProductRateInput = document.createElement('input');
  productRateProductRateInput.id = 'product-rate-product-rate-input';
  productRateProductRateInput.onchange = function() { ShowProductRate(); };
  productRateProductRateInput.type = 'number';
  productRateProductRateInput.min = 1;
  productRateProductRateInput.max = 9999;
  productRateProductRateInput.step = 1;
  productRateProductRateInput.value = 1;
  productRateProductRate.appendChild(productRateProductRateInput);

  const productRateProductRateLabel = document.createElement('label');
  productRateProductRateLabel.htmlFor = 'product-rate-product-rate';
  productRateProductRateLabel.textContent = ' / Hour';
  productRateProductRate.appendChild(productRateProductRateLabel);
  productRateContainer.appendChild(productRateProductRate);


  const productRateContent = document.createElement('div');
  productRateContent.id = 'product-rate-content';
  productRateContainer.appendChild(productRateContent);

  container.appendChild(productRateContainer);

  const contentContainer = GetInfoContentContainer();
  contentContainer.appendChild(container);
}

function RemoveInfoTabSelected() {
  const tabs = document.querySelectorAll('#tab-container > div');
  for (const tab of tabs) {
    tab.classList.remove('selected');
  }
  const containers = document.querySelectorAll('#info-content-container > div');
  for (const container of containers) {
    container.style.display = 'none';
  }
}

function ShowInfoLayoutContent() {
  RemoveInfoTabSelected();
  document.querySelector('#layout-tab').classList.add('selected');
  document.querySelector('#layout-container').style.display = 'block';
}

function ShowInfoCalculationContent() {
  RemoveInfoTabSelected();
  document.querySelector('#calculation-tab').classList.add('selected');
  document.querySelector('#calculation-container').style.display = 'block';
}

function ShowInfoSetupContent() {
  RemoveInfoTabSelected();
  document.querySelector('#setup-tab').classList.add('selected');
  document.querySelector('#setup-container').style.display = 'block';
}

function ShowProductRate() {
  // Empty UI.
  const content = document.querySelector('#product-rate-content');
  content.textContent = "";

  // Prepare rate.
  const productName = document.querySelector('#product-rate-product-select').value;
  const rate = document.querySelector('#product-rate-product-rate-input').value;
  const craft = recipes[productName];
  if (
    craft == undefined ||
    rate <= 0
  ) {
    return;
  }

  const requirements = {};
  GetProductCraftRequirement(productName, 1, requirements);

  // Show on UI.
  const sortedRequirements = SortObject(requirements);
  for (const requirement in sortedRequirements) {
    const recipeRequirement = recipes[requirement];

    if (recipeRequirement == undefined) {
      continue;
    }

    const value = sortedRequirements[requirement] * rate;
    const requirementContainer = document.createElement('div');
    requirementContainer.classList.add('ingredient');

    const requirementImage = document.createElement('img');
    requirementImage.src = getCraftIcon(requirement);
    requirementImage.classList.add('recipeimage');
    requirementContainer.appendChild(requirementImage);

    const requirementName = document.createElement('span');
    requirementName.classList.add('product-rate-name');
    requirementName.textContent = getPrettyName(requirement);
    requirementContainer.appendChild(requirementName);

    const requirementValue = document.createElement('span');
    requirementValue.classList.add('product-rate-value');
    requirementValue.textContent = value;
    requirementContainer.appendChild(requirementValue);

    content.appendChild(requirementContainer);
  }
}

function GetProductCraftRequirement(productName, multiple = 1, requirements) {
  const craft = recipes[productName];
  for (let i = 1; i <= maxRequirement; i++) {
    const requirement = craft["Req" + i];
    if (
      requirement == "none" ||
      requirement == undefined
    ) {
      return;
    }

    if (requirements[requirement] == undefined) {
      requirements[requirement] = 0;
    }

    const value = craft["Value" + i];
    const newMultiple = value * multiple;
    requirements[requirement] += newMultiple;
    GetProductCraftRequirement(requirement, newMultiple, requirements);
  }
}

function IsEmptyObject(object) {
  return object
  && Object.keys(object).length === 0
  && Object.getPrototypeOf(object) === Object.prototype
}

function ClearChildren(element) {
  element.replaceChildren();
}

function ClearArray(array) {
  array.length = 0;
}

function SortObject(obj) {
  return Object.keys(obj).sort().reduce(function (result, key) {
    result[key] = obj[key];
    return result;
  }, {});
}

function localGetValue(name) {
  return JSON.parse(localStorage.getItem(name));
}

function localSetValue(name, value) {
  localStorage.setItem(name, JSON.stringify(value));
}


function CalculateAppliedUtilities() {
  // Reset
  Object.keys(appliedUtilities).forEach((utility) => {
    delete appliedUtilities[utility];
  });

  appliedNfts.forEach((nftName) => {
    const nft = nfts[nftName];
    if (
      nft &&
      nft.utilities
    ) {
      Object.keys(nft.utilities).forEach((utility) => {
        Object.keys(nft.utilities[utility]).forEach((building) => {
          if (!appliedUtilities[utility]) {
            appliedUtilities[utility] = {};
          }
          if (!appliedUtilities[utility][building]) {
            appliedUtilities[utility][building] = 0;
          }
          appliedUtilities[utility][building] += nft.utilities[utility][building];
        });
      });
    }
  });
  ShowAppliedUtilities();
}

function ShowAppliedUtilities() {
  const sortedAppliedUtilities = SortObject(appliedUtilities);
  const infoContainer = document.querySelector('#setup-info-container');
  infoContainer.textContent = "";
  Object.keys(sortedAppliedUtilities).forEach((utility) => {
    const sortedAppliedUtilitiesBuildings = SortObject(sortedAppliedUtilities[utility]);
    Object.keys(sortedAppliedUtilitiesBuildings).forEach((building) => {
      const container = document.createElement('div');
      container.textContent = getPrettyName(utility) + " " + getPrettyName(building) + " : " + sortedAppliedUtilitiesBuildings[building] + "%";
      infoContainer.appendChild(container);
    });
  });
}

function LoadAppliedNfts() {
  appliedNfts = localGetValue(appliedNftsName);
  if (!appliedNfts) {
    appliedNfts = [];
  }
}

function SetAppliedNfts() {
  localSetValue(appliedNftsName, appliedNfts);
  CalculateAppliedUtilities();
}

function AddAppliedNfts(nftName) {
  if (!appliedNfts.includes(nftName)) {
    appliedNfts.push(nftName);
    SetAppliedNfts();
  }
}

function RemoveAppliedNfts(nftName) {
  if (appliedNfts.includes(nftName)) {
    const filtered = appliedNfts.filter((value) => {
      return value != nftName;
    });
    appliedNfts = filtered;
    SetAppliedNfts();
  }
}

function LoadSetupTab() {
  LoadAppliedNfts();

  // Tab
  const tab = document.createElement('div');
  tab.id = 'setup-tab';
  tab.textContent = 'Setup';
  tab.onclick = function() { ShowInfoSetupContent(); };
  const tabContainer = GetTabContainerElement();
  tabContainer.appendChild(tab);

  // Content
  const container = document.createElement('div');
  container.id = 'setup-container';
  container.style.display = 'none';

  const containerContentContainer = document.createElement('div');
  containerContentContainer.id = 'setup-container-content-container';
  container.appendChild(containerContentContainer);

  const contentContainer = GetInfoContentContainer();
  contentContainer.appendChild(container);

  LoadSetupInfo();
  LoadSetupOrnaments();
  LoadSetupOthers();
}

function LoadSetupInfo() {
  const infoContainer = document.createElement('div');
  infoContainer.id = 'setup-info-container';

  const contentContainer = GetSetupContainerContentContainer();
  contentContainer.appendChild(infoContainer);

  CalculateAppliedUtilities();
}

function LoadSetupOrnaments() {
  const ornaments = setup.ornaments;
  const ornamentContainer = document.createElement('div');
  ornamentContainer.id = 'ornament-container';

  const ornamentSectionTitle = document.createElement('div');
  ornamentSectionTitle.classList.add('setup-title');
  ornamentSectionTitle.textContent = 'Enchanted Ornaments';
  ornamentContainer.appendChild(ornamentSectionTitle);

  Object.keys(ornaments).forEach((nftName) => {
    const ornament = ornaments[nftName];
    const container = document.createElement('div');
    container.title = nfts[nftName].description;

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.id = 'setup-' + nftName;
    input.name = 'setup-' + nftName;
    input.value = nftName;
    input.checked = appliedNfts.includes(nftName);
    input.onchange = function() { SetSetupNftNameCheckbox(this.value, this.checked); };
    container.appendChild(input);

    const label = document.createElement('label');
    label.htmlFor = 'setup-' + nftName;

    const image = document.createElement('img');
    image.src = getNftIcon(nftName);
    image.loading = "lazy";
    image.classList.add('recipeimage');
    label.appendChild(image);

    const name = document.createElement('span');
    name.classList.add('nft-title');
    name.textContent = ornament.name;
    label.appendChild(name);

    container.appendChild(label);

    ornamentContainer.appendChild(container);
  });

  const contentContainer = GetSetupContainerContentContainer();
  contentContainer.appendChild(ornamentContainer);
}

function LoadSetupOthers() {
  const others = setup.others;
  const otherContainer = document.createElement('div');
  otherContainer.id = 'other-container';

  const otherSectionTitle = document.createElement('div');
  otherSectionTitle.classList.add('setup-title');
  otherSectionTitle.textContent = 'Others';
  otherContainer.appendChild(otherSectionTitle);

  Object.keys(others).forEach((nftName) => {
    const other = others[nftName];
    const container = document.createElement('div');
    container.title = nfts[nftName].description;

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.id = 'setup-' + nftName;
    input.name = 'setup-' + nftName;
    input.value = nftName;
    input.checked = appliedNfts.includes(nftName);
    input.onchange = function() { SetSetupNftNameCheckbox(this.value, this.checked); };
    container.appendChild(input);

    const label = document.createElement('label');
    label.htmlFor = 'setup-' + nftName;

    const image = document.createElement('img');
    image.src = getNftIcon(nftName);
    image.loading = "lazy";
    image.classList.add('recipeimage');
    label.appendChild(image);

    const name = document.createElement('span');
    name.classList.add('nft-title');
    name.textContent = other.name;
    label.appendChild(name);

    container.appendChild(label);

    otherContainer.appendChild(container);
  });

  const contentContainer = GetSetupContainerContentContainer();
  contentContainer.appendChild(otherContainer);
}

function SetSetupNftNameCheckbox(nftName, checked) {
  if (checked) {
    AddAppliedNfts(nftName);
  } else {
    RemoveAppliedNfts(nftName);
  }
}

function getNftIcon(nft) {
  return getFullURL(nfts[nft]?.FileUrl);
}





function loadTemplateGrid() {
  grid.biome = templateGrid.biome;
  grid.northborder = templateGrid.northborder;
  grid.southborder = templateGrid.southborder;
  grid.eastborder = templateGrid.eastborder;
  grid.westborder = templateGrid.westborder;
  if (biome == "none") {
    clearGrid();
  } else {
  templateGrid.grid = getGridFromMap(biome, direction);
  setDefaultType();
  grid.grid = templateGrid.grid.map((cell) => {
    return {
      type: cell.type,
      edgeSatisfied: true,
    };
  });
}

  updateExportGrid();
}

function setDefaultType() {
  if (biome == "Desert") {
    grid.defaultType = "Arid";
  } else {
    grid.defaultType = "Grass";
  }
}

function importGrid() {
  const importExport = document.querySelector('#importexport');
  if (importExport.value != "") {
    const importedGrid = JSON.parse(importExport.value);
    grid.biome = importedGrid.biome? importedGrid.biome : "Forest";
    document.querySelector("#biomes").value = grid.biome;
    grid.northborder = importedGrid.northborder;
    grid.southborder = importedGrid.southborder;
    grid.eastborder = importedGrid.eastborder;
    grid.westborder = importedGrid.westborder;
    renderBorders();
    grid.filename = importedGrid.filename;
    // null will force later SetActiveStage.
    grid.stageIndex = null;
    ClearArray(stages);
    if (
      importedGrid.stages
      && importedGrid.stages.length > 0
    ) {
      if (importedGrid.stages.length)
        grid.stageIndex = null;
      importedGrid.stages.forEach((stage, index) => {
        SetStageData(index, stage.name, stage.grid);
      });
    } else {
      const filteredGrid = importedGrid.grid.map((cell) => {
        let gridCell = {
          type: ConvertCorrectionName(cell.type),
          edgeSatisfied: true,
        };
        if (cell.craft) {
          gridCell.craft = ConvertCorrectionName(cell.craft);
        }
        return gridCell;
      });
      grid.grid = filteredGrid;
    }
    LoadStages();

    if (importedGrid.stageIndex >= 0) {
      SetActiveStage(importedGrid.stageIndex);
    }
    if (
      grid.filename
      && grid.filename.length > 0
    ) {
      document.querySelector('#town-guide-eu-filename').value = grid.filename;
    }
  }
}

function renderOverlaysOptions() {
  var optionsHtml = "<option value='none'>None</option>";
  passiveTypes.forEach((type) => {
    optionsHtml += `<option value="${type}">${type}</option>`;
  });
  $("#overlays").html(optionsHtml);
}

function renderBiomeOptions() {
  var optionsHtml = "";
  biomes.forEach((type) => {
    optionsHtml += `<option value="${type}">${type}</option>`;
  });
  optionsHtml += "<option value='none'>Empty</option>";
  $("#biomes").html(optionsHtml);
}

function renderBuildingMenu() {
  const categories = [
    "All",
    "Farm",
    "Ranch",
    "Terrain",
    "Industrial",
    "Trade",
    "Fishing",
    "Jewelry",
    "BlockChain",
  ];
  const categoryClass = document.querySelector(".category");
  const categoriesClass = document.querySelector(".categories");
  categoryClass.textContent = "";
  categoriesClass.textContent = "";
  categories.forEach((category) => {
    const isAllCategory = category == "All";
    const categoryElement = document.createElement("div");
    categoryElement.id = category;
    categoryElement.classList.add("categorybutton");
    categoryElement.onclick = function() { showCategoryMenu(category); };
    categoryElement.title = category;
    const categoryImage = document.createElement("img");
    let categoryImageSrc = "./images/" + category + "-menu.png";
    if (category === "All") {
        categoryImageSrc = "https://cdn-icons-png.flaticon.com/512/3875/3875172.png";
    } else if (category === "Farm") {
      categoryImageSrc = iconUrls.categoryFarm;
    } else if (category === "Ranch") {
      categoryImageSrc = iconUrls.categoryRanch;
    } else if (category === "Terrain") {
      categoryImageSrc = iconUrls.categoryTerrain;
    } else if (category === "Industrial") {
      categoryImageSrc = iconUrls.categoryIndustrial;
    } else if (category === "Trade") {
      categoryImageSrc = iconUrls.categoryTrade;
    } else if (category === "Fishing") {
      categoryImageSrc = iconUrls.categoryFishing;
    } else if (category === "Jewelry") {
      categoryImageSrc = iconUrls.categoryJewelry;
    }
    categoryImage.src = categoryImageSrc;
    categoryElement.appendChild(categoryImage);
    categoriesClass.appendChild(categoryElement);

    const buildingMenuElement = document.createElement("div");
    buildingMenuElement.id = category + "-menu";
    buildingMenuElement.classList.add("buildingshidden");

    for (const building in townstarObjects) {
      if (excludedBuildings.includes(building)) continue;
      if (
        townstarObjects[building].Class == category ||
        isAllCategory
      ) {
        const removedBuilding = removeSpecialCharacter(building);
        const buildingElement = document.createElement("div");
        buildingElement.id = removedBuilding;
        buildingElement.classList.add("buildingmenubutton");
        buildingElement.title = getPrettyName(building);
        buildingElement.onclick = function() { selectBuilding(building); };
        const buildingImageElement = document.createElement("img");
        buildingImageElement.src = getTileIcon(building);
        buildingElement.appendChild(buildingImageElement);
        buildingMenuElement.appendChild(buildingElement);
      }
    }
    const buildingElement = document.createElement("div");
    buildingElement.id = "remove";
    buildingElement.classList.add("buildingmenubutton");
    buildingElement.classList.add("buildingmenudeletebutton");
    buildingElement.title = "Remove";
    buildingElement.onclick = function() { selectBuilding(this.id); };
    const buildingImageElement = document.createElement("img");
    buildingImageElement.src = getFullURL(iconUrls.remove);
    buildingElement.appendChild(buildingImageElement);
    buildingMenuElement.appendChild(buildingElement);
    categoryClass.appendChild(buildingMenuElement);
  });
}

function clearGrid() {
  for (let i = 0; i < 256; i++) {
      grid.grid[i].type = grid.defaultType;
      grid.grid[i].craft = undefined;
  }
  renderGrid();
}

function loadGrid() {
  var gridHTML = "";
  for (i = 0; i < dimension * dimension; i++) {
    gridHTML += `<div id="cell${i}" class="cell" onclick="selectCell(this)"><i></i></div>`;
  }

  $(".gamegrid").html(gridHTML);
}

function selectCell(cell) {
  HideStageInfo();
  if (selected) document.querySelector("#" + selected).classList.remove("selected");
  selected = cell.id;
  if (selectedBuilding != "") placeTile(selectedBuilding);
  cell.classList.add("selected");
  renderStats();
  // renderGrid();
}

function showCategoryMenu(type) {
  removeSelectedBuilding();
  if (type != "All") {
    selectedCategory = type;
    document.querySelector("#search-building").value = "";
  }
  const categoriesElements = document.querySelectorAll(".categorybutton");
  for (const element of categoriesElements) {
    element.classList.remove("selected");
  }
  const selectedCategoryElement = document.querySelector("#" + type);
  selectedCategoryElement.classList.add("selected");

  const buildingsElements = document.querySelectorAll(".buildings");
  for (const element of buildingsElements) {
    element.setAttribute("class", "");
    element.classList.add("buildingshidden");
  }
  const selectedMenuElement = document.querySelector("#" + type + "-menu");
  selectedMenuElement.classList.remove("buildingshidden");
  selectedMenuElement.classList.add("buildings");
}

function selectBorder(border) {
  var index = borderTypes.indexOf(grid[border]);

  index++;
  if (index > borderTypes.length - 1) index = 0;
  var newBorderType = borderTypes[index];
  grid[border] = newBorderType;
  renderBorders();
  renderGrid();
  // renderStats();
  updateExportGrid();
}

function renderBorders() {
  borders.forEach((bdr) => {
    templateGrid[bdr] = grid[bdr];
    const borderElement = document.querySelector('#' + bdr);
    const borderBiome = grid[bdr];
    borderElement.setAttribute("class", "");
    borderElement.classList.add(bdr, borderBiome);
    borderElement.querySelector('i').textContent = borderBiome;
  });
}

function selectBuilding(type) {
  removeSelectedBuildingClass();
  if (selectedBuilding != type) {
    selectedBuilding = type;
    const buildingTypes = document.querySelectorAll('[id="' + removeSpecialCharacter(type) + '"]');
    buildingTypes.forEach((buildingType) => {
      buildingType.classList.add("selectedbuildingmenubutton");
    });
    if (type == "remove") {
      document.querySelector('.buildingmenudeletebutton').classList.add("selectedbuildingmenubutton");
    }
  } else {
    selectedBuilding = "";
  }
}

function placeTile(type) {
  const id = getCellIndex();
  if (id != null) {
    delete grid.grid[id].craft;
    if (grid.grid[id].type == type || type == "remove") {
      grid.grid[id].type = grid.defaultType;
      grid.grid[id].edgeSatisfied = true;
    } else {
      grid.grid[id].type = type;

      const building = townstarObjects[type];
      if (building) {
        const buildingRecipes = building.Crafts.split(",");
        if (
          buildingRecipes.length == 1 &&
          buildingRecipes[0] != "None"
        ) {
          grid.grid[id].craft = ConvertCorrectionName(buildingRecipes[0]);
        }
      }
    }
    renderGrid();
    updateExportGrid();
  }
}

function updateExportGrid() {
  if (canUpdateLocalLayout) {
    exportGrid.biome = grid.biome;
    exportGrid.northborder = grid.northborder;
    exportGrid.southborder = grid.southborder;
    exportGrid.eastborder = grid.eastborder;
    exportGrid.westborder = grid.westborder;
    exportGrid.stageIndex = GetActiveStageIndex();
    exportGrid.filename = grid.filename;
    SetStageByGrid();
    exportGrid.stages = stages;
    document.querySelector("#importexport").value = JSON.stringify(exportGrid);

    localSetValue(localLayoutName, exportGrid);
  }
}

function copyToClipboard() {
  const copyText = document.querySelector('#importexport');
  copyText.select();
  // copyText.setSelectionRange(0, 999999);
  document.execCommand("copy");
}

function updateOverlay(selection) {
  overlayMode = selection.value;
  renderGrid();
}

function updateBiome(selection) {
  biome = selection.value;
  templateGrid.biome = biome;
  loadTemplateGrid();
  renderGrid();
}

function updateDirection(selection) {
  direction = selection.value;
  loadTemplateGrid();
  renderGrid();
}

function renderStats() {
  HideStageInfo();
  const cellIndex = getCellIndex();
  const cell = grid.grid[cellIndex];
  selectedCraft = "";
  craftChecked = false;
  if (!cell) return;
  const building = townstarObjects[cell.type];
  if (building === undefined) return;
  const infoSpan = document.createElement('span');
  const infoImage = document.createElement('img');
  infoImage.src = getTileIcon(cell.type);
  infoSpan.appendChild(infoImage);
  const tileinfopic = document.querySelector(".tileinfopic");
  tileinfopic.textContent = "";
  tileinfopic.appendChild(infoSpan);
  const recipeBuildingName = getPrettyName(cell.type);
  document.querySelector(".tileinfotitle").innerHTML = `<span>${getPrettyName(cell.type)}</span`;
  const buildingRecipes = building.Crafts.split(",");

  let recipesHTML = "";
  if (buildingRecipes.length != 0) {
    recipesHTML = "<span class='recipesheader'>Recipes</span>";
    buildingRecipes.forEach((rec) => {
      if (rec == "None") return;
      if (cell.craft == rec) {
        selectedCraft = cell.craft;
        craftChecked = true;
      }
      recipesHTML +=
        `<div class="reciperow">` +
          `<div class="recipeheader">` +
            `<input id="recipe_${rec}" onclick="checkCraft(this);" name="recipe_${cell.type}" class="recipecraft" value="${rec}" type="radio"` + (cell.craft == rec ? ` checked` : ``) + ` onchange="setRecipeCellCraft(${cellIndex},'${cell.type}','${rec}'); updateExportGrid();"></input>` +
            `<label for="recipe_${rec}" class="recipetitle">` +
              `<img class='recipeimage' src='${getCraftIcon(rec)}' />` +
            `${getCraftName(rec)}</label>` +
          `</div>` +
          `<div class="recipetimer">${getRecipeTime(rec, cell)}</div>` +
          `${getIngredients(rec, cell)}` +
        `</div>`;
    });
  }
  document.querySelector(".recipes").innerHTML = recipesHTML;
}

function getRecipeTime(rec, cell) {
  const recipe = recipes[rec];
  let timesHTML = "";
  let penalty = -1;
  if (
    townstarObjects[cell.type].ProximityImmune == false &&
    recipe.ProximityPenalty != "None"
  ) {
    penalty = getTimerClass(recipe.ProximityPenalty, cell);
  }
  const craftTimeMod = townstarObjects[cell.type].CraftTimeMod;
  const timeSpans = [];

  const time0 = document.createElement("span");
  time0.classList.add("timer");
  if (penalty <= 0) {
    time0.classList.add("timerselected");
  }
  time0.textContent = recipe.Time0 * craftTimeMod;
  timeSpans.push(time0);

  const time1 = document.createElement("span");
  time1.classList.add("timer");
  if (penalty == 1) {
    time1.classList.add("timerselected");
  }
  time1.textContent = recipe.Time1 * craftTimeMod;
  timeSpans.push(time1);

  const time2 = document.createElement("span");
  time2.classList.add("timer");
  if (penalty == 2) {
    time2.classList.add("timerselected");
  }
  time2.textContent = recipe.Time2 * craftTimeMod;
  timeSpans.push(time2);

  const time3 = document.createElement("span");
  time3.classList.add("timer");
  if (penalty > 2) {
    time3.classList.add("timerselected");
  }
  time3.textContent = recipe.Time3 * craftTimeMod;
  timeSpans.push(time3);

  if (recipe.TimeReverse) {
    timeSpans.reverse();
  }

  for (const key in timeSpans) {
    const timeSpan = timeSpans[key]
    timeSpan.classList.add(timerGrade[key]);
    timesHTML += timeSpan.outerHTML;
  }

  return timesHTML;
}

function getIngredients(rec, cell) {
  let ingredientHTML = "";
  const recipe = recipes[rec];
  if (!townstarObjects[cell.type].CraftReqsMet) {
    for (let i = 1; i <= maxRequirement; i++) {
      if (
        recipe["Req" + i] == "none" ||
        recipe["Req" + i] == undefined
      ) {
        return ingredientHTML;
      }
      ingredientHTML += getIngredientRatio(
        recipe["Req" + i],
        recipe["Value" + i],
        cell
      );
    }
  }
  return ingredientHTML;
}

function getIngredientRatio(ingredient, needed, cell) {
  const present = cell[ingredient] == undefined ? 0 : cell[ingredient];
  const presentBranch = Object.keys(cell).reduce((acc, cur) => {
    if (!acc) {
      acc = 0
    }
    if (
      ingredientBranches[ingredient] &&
      Object.keys(ingredientBranches[ingredient]).includes(cur) &&
      ingredientBranches[ingredient][cur].includes(cell.type)
    ) {
      return acc + cell[cur];
    }

    return acc;
  }, 0);
  const actualPresent = present + presentBranch;
  const ratio = `${actualPresent} / ${needed}`;

  return `<div class="ingredient">` +
      `<img class='recipeimage' src='${getCraftIcon(ingredient)}' />` +
      `<span>${getPrettyName(ingredient)}</span>` +
    `</div>` +
    `<div>` +
      `${ratio}` +
    `</div>`;
}

function getTimerClass(penaltyType, cell) {
  let totalPenalty = 0;
  penaltyType.split(",").forEach((type) => {
    totalPenalty += cell[type];
  });

  return totalPenalty;
}

function renderGrid() {
  if (canUpdateLocalLayout) {
    resetAllPassive();
    calculateBiomeEffects();
    calculateBorderEffects();
    calculatePassiveEffects();
    calculateEdgeRequirements();
    const pageGrid = $(".gamegrid");
    for (let i = 0, n = grid.grid.length; i < n; i++) {
      const cell = grid.grid[i];
      const classes = getClasses(i);
      const pageGridChild = pageGrid.children().eq(i);
      pageGridChild.html("");
      pageGridChild.attr("class", classes);
      const imageElement = document.createElement('img');
      imageElement.src = getTileIcon(cell.type);
      pageGridChild.append(imageElement);
      setIconTitle(pageGridChild, cell);
      setCellCraft(i, cell.craft);
    }
    updateExportGrid();
    DisplayProximity();
  }
}

function getTileIcon(type) {
  let objectType = type;
  let fileUrl = townstarObjects[objectType]?.FileUrl;
  if (
    ["Grass","Marsh","Tree","Rock","Scrub","Arid","Cactus","Oil_Seep","Construction_Site"].includes(objectType) == false &&
    fileUrl == null
  ) {
    objectType = "NO_IMAGE";
  }

  switch (objectType) {
    case "Grass":
      return "./images/grass-icon.png";
    case "Marsh":
      return "./images/marsh-icon.png";
    case "Tree":
      return "./images/tree-icon.png";
    case "Rock":
      return "./images/rock-icon.png";
    case "Scrub":
      return "./images/scrub-icon.png";
    case "Arid":
      return "./images/arid-icon.png";
    case "Cactus":
      return "./images/cactus-icon.png";
    case "Oil_Seep":
      return "./images/seep-icon.png";
    case "Construction_Site":
      return "https://cdn-icons-png.flaticon.com/512/1012/1012232.png";
    case "NO_IMAGE":
      return "https://cdn-icons-png.flaticon.com/512/3875/3875172.png";
    default:
      return getFullURL(fileUrl);
  }
}

function setIconTitle(divCell, cell) {
  var titleString = `${getPrettyName(cell.type)}`;
  passiveTypes.forEach((type) => {
      let proximityCount = cell[type];
      if (proximityCount < 0) {
          proximityCount = 0;
      } else if (proximityCount > 99) {
          proximityCount = 99;
      }
      if (proximityCount != undefined && proximityCount != 0) {
          titleString += `\n${type}: ${cell[type]}`;
      }
  });

  divCell.children().eq(0).attr("title", titleString);
}

// DOUBLE CHECK
function getClasses(index) {
  const cell = grid.grid[index];
  let classes = [];
  classes.push("cell");
  //classes.push(cell.type);
  if (getCellIndex() == index) classes.push("selected");
  passiveTypes.forEach((type) => {
      classes.push(getPenaltyClass(type, cell));
  });
  classes.push(getWateredClass(cell));
  if (!cell.edgeSatisfied) classes.push("noedge");
  return classes.join(" ");
}

function getCellIndex() {
  if (selected != "") {
    return parseInt(selected.substr(4));
  } else {
    return null;
  }
}

function getPenaltyClass(penaltyType, cell) {
  if (penaltyType == "Water") return "";
  if (penaltyType != overlayMode) return "";
  if (cell[penaltyType] >= 3) return "penaltyOverlay3Plus";
  if (cell[penaltyType] == 2) return "penaltyOverlay2";
  if (cell[penaltyType] == 1) return "penaltyOverlay1";

  return "";
}

function getWateredClass(cell) {
  if (cell.Water == 0 || overlayMode != "Water") return "";
  return "watered" + Math.min(cell.Water, 10);
}

function getBuildingForCell(cellType) {
  var gridBuilding = buildings.filter((bdg) => bdg.Name == cellType);
  if (gridBuilding.length != 1) return null;

  var building = gridBuilding[0];
  if (building === undefined) return null;

  return building;
}

function calculatePassiveEffects() {
  let applied = {
    Platinum_Master_Copper_Smith: false,
    Cooper: false,
    Goldy: false,
    Sylvester: false
  };

  const isFullMazeSets = IsFullMazeSets();
  const isDiamondWaterPump = IsDiamondWaterPump();
  const isDiamondChargeStation = IsDiamondChargeStation();
  const isFullPannerBrotherSets = IsFullPannerBrotherSets();

  for (let i = 0; i < grid.grid.length; i++) {
    const cell = grid.grid[i];
    const building = townstarObjects[cell.type];
    const isMaze3 = cell.type == "Haunted_Maze_-_Zone_3";
    const isSelfProximity = selfProximityBuildings.includes(cell.type);

    if (building == null) continue;

    let effects = building.ProximityEmit.split(",");
    let effectRadius = building.ProximityDist;
    let proximityDistIndex = 0;
    let isProximityDistArray = Array.isArray(building.ProximityDist);
    if (isProximityDistArray) {
      effectRadius = building.ProximityDist[proximityDistIndex];
    }
    let effectValue = effectRadius;
    let fixedEffectValue = 0;
    if (cell.type === "Rare_Water_Pump") {
      effectValue = originalNFTProximityBonuses[cell.type][0];
      effectRadius = (originalNFTProximityBonuses[cell.type]).length;
    }
    if (cell.type === "888_Orb_of_Hope") {
      effects = ['Dirty'];
      effectRadius = 1;
      effectValue = effectRadius;
      fixedEffectValue = -999;
    }
    if (cell.type === "Beacon_of_Light") {
      effects = ['Shady'];
      effectRadius = 3;
      effectValue = effectRadius;
      fixedEffectValue = -999;
    }
    if (cell.type === "Sphere_Of_Hope") {
      effects = ['Dirty','Salty'];
      effectRadius = 5;
      effectValue = effectRadius;
      fixedEffectValue = -999;
    }
    if (cell.type === "Platinum_Master_Copper_Smith") {
      effects = boostedNftProximityEffects.Platinum_Master_Copper_Smith.Platinum_Master_Copper_Smith;
      if (applied[cell.type] === false) {
        effectRadius = 32;
        effectValue = effectRadius;
        fixedEffectValue = 1;
      } else {
        effectRadius = 0;
        effectValue = effectRadius;
        fixedEffectValue = 0;
      }
    }
    if (cell.type === "Cooper") {
      effects = boostedNftProximityEffects.Panner_Brother.Cooper;
      if (applied[cell.type] === false) {
        effectRadius = 32;
        effectValue = effectRadius;
        fixedEffectValue = 1;
      } else {
        effectRadius = 0;
        effectValue = effectRadius;
        fixedEffectValue = 0;
      }
    }
    if (cell.type === "Goldy") {
      effects = boostedNftProximityEffects.Panner_Brother.Goldy;
      if (applied[cell.type] === false) {
        effectRadius = 32;
        effectValue = effectRadius;
        fixedEffectValue = 1;
      } else {
        effectRadius = 0;
        effectValue = effectRadius;
        fixedEffectValue = 0;
      }
    }
    if (cell.type === "Sylvester") {
        effects = boostedNftProximityEffects.Panner_Brother.Sylvester;
      if (applied[cell.type] === false) {
        effectRadius = 32;
        effectValue = effectRadius;
        fixedEffectValue = 1;
      } else {
        effectRadius = 0;
        effectValue = effectRadius;
        fixedEffectValue = 0;
      }
    }
    if (cell.type === "Legendary_Nourish_Barn") {
      effectValue = originalNFTProximityBonuses[cell.type][0];
      effectRadius = (originalNFTProximityBonuses[cell.type]).length;
    }
    if (cell.type === "CGW_Commemorative") {
      effects = ['Shady'];
      effectRadius = 1;
      effectValue = effectRadius;
      fixedEffectValue = -999;
    }

    for (const index in effects) {
      if (isProximityDistArray) {
        effectRadius = building.ProximityDist[proximityDistIndex];
        effectValue = building.ProximityDist[proximityDistIndex++];
      }
      const proximity = effects[index];
      if (
        building.ProximityEmit == "None"
        && fixedEffectValue == 0
      ) {
        effectRadius = 0;
      }
      if (mazeSets.includes(cell.type)) {
        if (
          isFullMazeSets == true &&
          boostedNftProximityEffects.Haunted_Maze[cell.type].includes(proximity) == true
        ) {
          const boostedBonuses = boostedNftProximityBonuses.Haunted_Maze[cell.type];
          effectValue = boostedBonuses[0];
          effectRadius = boostedBonuses.length;
          if (isMaze3) {
            fixedEffectValue = effectValue;
          }
        } else {
          const originalBonuses = originalNFTProximityBonuses.Haunted_Maze[cell.type];
          effectValue = originalBonuses[0];
          effectRadius = originalBonuses.length;
          if (isMaze3) {
            fixedEffectValue = effectValue;
          }
        }
      }
      if (diamondWaterPump.includes(cell.type)) {
        if (
          isDiamondWaterPump == true &&
          boostedNftProximityEffects.Diamond_Water_Pump[cell.type].includes(proximity) == true
        ) {
          const boostedBonuses = boostedNftProximityBonuses.Diamond_Water_Pump[cell.type];
          effectValue = boostedBonuses[0];
          effectRadius = boostedBonuses.length;
        } else {
          const originalBonuses = originalNFTProximityBonuses.Diamond_Water_Pump[cell.type];
          effectValue = originalBonuses[0];
          effectRadius = originalBonuses.length;
        }
      }
      if (diamondChargeStation.includes(cell.type)) {
        if (
          isDiamondChargeStation == true &&
          boostedNftProximityEffects.Diamond_Charge_Station[cell.type].includes(proximity) == true
        ) {
          const boostedBonuses = boostedNftProximityBonuses.Diamond_Charge_Station[cell.type];
          effectValue = boostedBonuses[0];
          effectRadius = boostedBonuses.length;
        } else {
          const originalBonuses = originalNFTProximityBonuses.Diamond_Charge_Station[cell.type];
          effectValue = originalBonuses[0];
          effectRadius = originalBonuses.length;
        }
      }
      if (pannerSets.includes(cell.type)) {
          if (
            isFullPannerBrotherSets == true &&
            boostedNftProximityEffects.Panner[cell.type].includes(proximity) == true
          ) {
            const boostedBonuses = boostedNftProximityBonuses.Panner[cell.type];
            effectValue = boostedBonuses[0];
            effectRadius = boostedBonuses.length;
          } else {
            const originalBonuses = originalNFTProximityBonuses.Panner[cell.type];
            effectValue = originalBonuses[0];
            effectRadius = originalBonuses.length;
          }
      }
      if (effectRadius == 0) continue;
      setTileProximity(i, proximity, effectValue, effectRadius, fixedEffectValue, isSelfProximity);
    }

    if (applyOnceBuildings.includes(cell.type)) {
      applied[cell.type] = true;
    }
  }
}

function setTileProximity(index, proximity, value, radius, fixedEffectValue, isSelfProximity = false) {
  const tileRow = Math.floor(index / dimension);
  const tileCol = index % dimension;
  const tileType = grid.grid[index].type;

  if (isSelfProximity) {
      let proximityValue = value;
      if (fixedEffectValue != 0) {
          proximityValue = fixedEffectValue;
      }
      grid.grid[index][proximity] += proximityValue;
  }

  for (let x1 = tileRow - radius, x2 = tileRow + radius; x1 <= x2; x1++) {
    for (let y1 = tileCol - radius, y2 = tileCol + radius; y1 <= y2; y1++) {
      if (IsOutOfGrid(x1, y1) === false) {
        const xOffset = Math.abs(tileRow - x1);
        const yOffset = Math.abs(tileCol - y1);
        const tileIndex = (dimension * x1) + y1;
        let proximityValue = 0;
        if (!(xOffset == 0 && yOffset == 0)) {
          const yOffsetValue = Math.max(yOffset - 1, 0);
          const xOffsetValue = Math.max(xOffset - 1, 0);
          if (yOffsetValue + xOffsetValue <= radius) {
            proximityValue = Math.max(value - yOffsetValue - xOffsetValue, 0);

            if (fixedEffectValue != 0) {
              proximityValue = fixedEffectValue;
            }
          }
        } else {
          if (fixedEffectValue != 0) {
            proximityValue = fixedEffectValue;
          }
        }

        grid.grid[tileIndex][proximity] += proximityValue;
        // If no proximity bonus allowed, remove the proximity on the building tile.
        const type = grid.grid[tileIndex].type;
        if (type) {
          const crafts = townstarObjects[type].Crafts.split(",");
          for (const craft of crafts) {
            if (recipes[craft]) {
              const recipe = recipes[craft];
              if (
                [recipe.Req1, recipe.Req2, recipe.Req3, recipe.Req4].includes(proximity) &&
                (
                  recipe.ProximityBonus == "None" ||
                  recipe.ProximityBonus.split(",").includes(proximity) === false
                )
              ) {
                grid.grid[tileIndex][proximity] -= proximityValue;
                break;
              }
            }
          }
        }
      }
    }
  }
}

function IsOutOfGrid(x, y) {
  return x < 0 || x > dimension - 1 || y < 0 || y > dimension - 1;
}

function DisplayProximity() {
  let cells = document.querySelectorAll('.cell');
  cells.forEach(cell => {
    let proximityDisplayElement = cell.querySelector('.proximity-display');
    if (proximityDisplayElement) {
      proximityDisplayElement.remove();
    }
    let proximity = GetCellProximity(cell);
    if (!IsEmptyObject(proximity)) {
      let overlay = document.querySelector('#overlays').value;
      Object.keys(proximity).forEach(key => {
        if (key === overlay) {
          let proximityAmount = proximity[key];
          let proximityElement = document.createElement('div');
          proximityElement.classList.add('proximity-display');
          // proximityElement.style.color = window.getComputedStyle(cell).borderColor;
          proximityElement.textContent = proximityAmount;
          cell.appendChild(proximityElement);
        }
      });
    }
  });
}

function GetCellProximity(selector) {
  let proximityTitle = selector.querySelector('img').title.replaceAll(" ","").split("\n");
  proximityTitle.shift();
  let proximityText = proximityTitle.join(",");
  let proximityObject = {};
  if (proximityText !== "") {
    let proximities = proximityText.split(",");
    proximities.forEach(proximity => {
      let proximityArray = proximity.split(':');
      proximityObject[proximityArray[0]] = proximityArray[1];
    });
  }

  return proximityObject;
}

function calculateBorderEffects() {
  const borderProximity = {
    "River": {
      "Water": [5, 4, 3, 2, 1],
    },
    "Ocean": {
      "Salty": [3, 2, 1],
    },
    "Mountains": {
      "Shady": [5, 4, 3, 2, 1],
    },
    "Desert": {
      "Sandy": [3, 2, 1],
    },
  };

  for (const border of borders) {
    if (Object.keys(borderProximity).includes(grid[border])) {
      const proximities = borderProximity[grid[border]];
      for (const proximity in proximities) {
        const proximityRange = borderProximity[grid[border]][proximity].length;
        for (let i = 0; i < proximityRange; i++) {
          const proximityValue = borderProximity[grid[border]][proximity][i];
          for (let j = 0; j < dimension; j++) {
            let index = 0;
            if (border == "northborder") {
              index = i * dimension + j;
            } else if (border == "eastborder") {
              index = j * dimension + (dimension - i - 1);
            } else if (border == "southborder") {
              index = (dimension - i - 1) * dimension + j;
            } else if (border == "westborder") {
              index = j * dimension + i;
            }

            grid.grid[index][proximity] =
              grid.grid[index][proximity] + proximityValue;
          }
        }
      }
    }
  }
}

function isBorderTile(borderType, index) {
  return (
    (index < 16 && grid.northborder == borderType) ||
    (index > 240 && grid.southborder == borderType) ||
    (index % dimension == 0 && grid.westborder == borderType) ||
    (index % dimension == 15 && grid.eastborder == borderType)
  );
}

function calculateEdgeRequirements() {
  for (i = 0; i < grid.grid.length; i++) {
    var cell = grid.grid[i];

    var building = townstarObjects[cell.type];
    if (building == null) continue;

    if (
      building.EdgeRequirements != "None" &&
      building.EdgeRequirements != ""
    ) {
      var requirements = [];
      if (building.EdgeRequirements.indexOf(":AND:") >= 0) {
        requirements = building.EdgeRequirements.split(":AND:");
        var missingEdge = false;
        for (edgeType in requirements) {
          if (!hasEdge(requirements[edgeType], i)) {
            missingEdge = true;
            break;
          }
        }
        cell.edgeSatisfied = !missingEdge;
      } else {
        requirements = building.EdgeRequirements.split(":OR:");
        for (edgeType in requirements) {
          if (hasEdge(requirements[edgeType], i)) {
            cell.edgeSatisfied = true;
            break;
          } else {
            cell.edgeSatisfied = false;
          }
        }
      }
    }
  }
}

function hasEdge(edgeType, i) {
  if (
      //check borders
      (edgeType == "Waterway" &&
       (isBorderTile("Ocean", i) || isBorderTile("River", i))) ||
      (edgeType == "Mountains" && isBorderTile("Mountains", i)) ||
      (
        (edgeType == "OpenWorld" || edgeType == "Town") &&
        (
          isBorderTile("none", i) ||
          isBorderTile("Desert", i) ||
          isBorderTile("Forest", i) ||
          isBorderTile("Plains", i)
        )
      ) ||
      //check NSEW
      (!isOutOfBounds(i - dimension) &&
       isEdgeMatch(edgeType, grid.grid[i - dimension].type)) ||
      (!isOutOfBounds(i + dimension) &&
       isEdgeMatch(edgeType, grid.grid[i + dimension].type)) ||
      (!isOutOfBounds(i - 1) &&
       Math.floor(i / dimension) == Math.floor((i - 1) / dimension) &&
       isEdgeMatch(edgeType, grid.grid[i - 1].type)) ||
      (!isOutOfBounds(i + 1) &&
       Math.floor(i / dimension) == Math.floor((i + 1) / dimension) &&
       isEdgeMatch(edgeType, grid.grid[i + 1].type))
  ) {
      return true;
  }
  return false;
}

function isEdgeMatch(edge1, edge2) {
  //TODO: use EdgeClass of building objects if possible
  if (edge1 == "Road") {
    return edge2 == "Dirt_Road" || edge2 == "Paved_Road" || edge2 == "Uncommon_Paved_Road";
  }
  if (edge1 == "Water_Pump") {
    return edge2 == "Water_Pump" || edge2 == "Rare_Water_Pump" || edge2 == "Diamond_Water_Pump" || edge2 == "Rare_Grand_Aquifer";
  }
  if (edge1 == "Paved_Road") {
    return edge2 == "Paved_Road" || edge2 == "Uncommon_Paved_Road";
  }
  return edge1 == edge2;
}

function getBorderProperty(borderType) {
  switch (borderType) {
    case "River":
      return "Water";
    case "Ocean":
      return "Salty";
    case "Mountains":
      return "Shady";
    case "Desert":
      return "Sandy";
  }
}

function getPrettyName(name) {
  return name.replaceAll("_", " ");
}

function getFullURL(assetPath) {
  let url = '';
  if (assetPath) {
    url = `https://townstar.sandbox-games.com/${assetPath}`;
    if (assetPath.substring(0,4) == "http") {
      url = assetPath;
    }
  }
  return url;
}

function getBuildingProperties(buildingType) {
  return buildings.filter((building) => building.Building == buildingType)[0];
}

function isOutOfBounds(index) {
  return (
    index == i || //don't water yourself
    index < 0 || //outside lower grid bound
    index >= grid.grid.length
  ); //outside upper grid bound
}

function resetAllPassive() {
  grid.grid.forEach((cell) => {
    passiveTypes.forEach((property) => {
      cell[property] = 0;
    });
  });
}

function resetProperty(property) {
  grid.grid.forEach((cell) => {
    cell[property] = 0;
  });
}

function calculateBiomeEffects() {
  const biomeProximity = {
    "Desert": {
      "Sandy": [3]
    }
  }
  if (Object.keys(biomeProximity).includes(grid.biome)) {
    const proximities = biomeProximity[grid.biome];
    for (const proximity in proximities) {
      const proximityRange = biomeProximity[grid.biome][proximity].length;
      for (let i = 0; i < proximityRange; i++) {
        const proximityValue = biomeProximity[grid.biome][proximity][i];
        for (let index = 0, n = grid.grid.length; index < n; index++) {
          grid.grid[index][proximity] = grid.grid[index][proximity] + proximityValue;
        }
      }
    }
  }
}

function getCraftName(craft) {
  const name = recipes[craft]?.Name? recipes[craft].Name : craft;
  return getPrettyName(name);
}

function removeSelectedBuildingClass() {
  const buildings = document.querySelectorAll('.buildingmenubutton');
  buildings.forEach((building) => {
    building.classList.remove("selectedbuildingmenubutton");
  });
}

function removeSelectedBuilding() {
  removeSelectedBuildingClass();
  selectedBuilding = "";
}

function ConvertCorrectionName(name) {
  return !correctionNames[name] ? name : correctionNames[name];
}

function getCraftIcon(craft) {
  return getFullURL(recipes[craft]?.FileUrl);
}

function setCellCraft(cellIndex, craft) {
  grid.grid[cellIndex].craft = craft;
  renderCellCraft(cellIndex);
}

function setRecipeCellCraft(cellIndex, building, craft) {
  const selectedCraft = document.querySelector('input[name=\"recipe_\' + building + \'\"]:checked');
    let cellCraft = undefined;
    if (selectedCraft) {
      cellCraft = craft;
    }
    setCellCraft(cellIndex, cellCraft);
}

function renderCellCraft(cellIndex) {
  const cellElement = document.querySelector('#cell' + cellIndex);
  if (cellElement) {
    const cellImages = cellElement.querySelectorAll('img.cellcraft');
    if (cellImages.length > 0) {
      cellImages.forEach(element => {
        element.remove();
      })
    }
    const cell = grid.grid[cellIndex];
    if (cell.craft) {
      let cellCraft = document.createElement('img');
      cellCraft.classList.add('cellcraft');
      cellCraft.src = getCraftIcon(cell.craft);
      cellElement.appendChild(cellCraft);
    }
  }
}

function removeSpecialCharacter(string) {
  return string.replace(/'/g, '').replace(/\"/g, '');
}

function checkCraft(input) {
  if (
    input.value == selectedCraft &&
    craftChecked
  ) {
    input.checked = false;
    craftChecked = false;
    var event = new Event('change');
    input.dispatchEvent(event);
    return;
  }
  selectedCraft = input.value;
  craftChecked = true;
}

function LoadEdgeNumbering() {
  for (const border of borders) {
    const borderElement = document.querySelector("#" + border);
    if (border != "westborder") {
      for (let i = 1; i <= dimension; i++) {
        const div = document.createElement("div");
        div.textContent = i;
        borderElement.appendChild(div);
      }
    } else {
      for (let i = dimension; i > 0; i--) {
        const div = document.createElement("div");
        div.textContent = i;
        borderElement.appendChild(div);
      }
    }
  }
}

function LoadBuildingSearch() {
  const searchBuildingContainer = document.createElement("div");
  searchBuildingContainer.id = "search-building-container";
  const searchBuildingInput = document.createElement("input");
  searchBuildingInput.id = "search-building";
  searchBuildingInput.type = "text";
  searchBuildingInput.placeholder = "Search Building";
  searchBuildingInput.addEventListener("keyup", (event) => {
    if (event.isComposing || event.keyCode === 229) {
      return;
    }
    searchBuilding();
  });
  searchBuildingInput.addEventListener("blur", (event) => {
    if (event.isComposing || event.keyCode === 229) {
      return;
    }
    searchBuilding();
  });
  searchBuildingContainer.appendChild(searchBuildingInput);
  const categoriesClass = document.querySelector(".categories");
  categoriesClass.parentNode.insertBefore(searchBuildingContainer, categoriesClass.nextSibling);
}

function searchBuilding() {
  const searchBuildingText = document.querySelector("#search-building").value.trim();
  if (searchBuildingText.length > 0) {
    showCategoryMenu("All");
    const buildingElements = document.querySelectorAll("#All-menu div");
    for (const buildingElement of buildingElements) {
      let display = "none";
      if (new RegExp(searchBuildingText, "i").test(buildingElement.title)) {
        display = "";
      }
      buildingElement.style.display = display;
    }
  } else {
    showCategoryMenu(selectedCategory);
  }
}

function LoadTownGuideEuSupport() {
  const townGuideEuContainer = document.createElement('div');
  townGuideEuContainer.id = 'town-guide-eu-container';

  // town-guide.eu header
  const header = document.createElement('div');
  header.id = 'town-guide-eu-header';
  header.textContent = 'town-guide.eu Compatible';
  townGuideEuContainer.appendChild(header);

  // town-guide.eu filename
  const inputFilename = document.createElement('input');
  inputFilename.id = "town-guide-eu-filename";
  inputFilename.type = "text";
  inputFilename.placeholder = "Filename";
  inputFilename.value = defaultTownGuideFilename;
  inputFilename.style.width = "115px";
  inputFilename.onchange = function() {
    grid.filename = this.value;
  };
  townGuideEuContainer.appendChild(inputFilename);

  // town-guide.eu save
  const inputSave = document.createElement('input');
  inputSave.id = "town-guide-eu-save";
  inputSave.type = "button";
  inputSave.value = "Save";
  inputSave.onclick = function () {
    const filename = document.querySelector('#town-guide-eu-filename').value;
    const layout = GetTownGuideEuLayout(filename);
    const blob = new Blob(
      [JSON.stringify(layout)],
      { type: "text/plain;charset=utf-8" }
    );
    const url = URL.createObjectURL(blob);
    const file = document.createElement(`a`);
    file.download = filename + ".txt";
    file.href = url;
    document.body.appendChild(file);
    file.click();
    file.remove();
    URL.revokeObjectURL(url);
  };
  townGuideEuContainer.appendChild(inputSave);

  // town-guide.eu load
  const fileLoad = document.createElement('input');
  fileLoad.id = "town-guide-eu-file-load";
  fileLoad.type = "file";
  fileLoad.accept = ".txt";
  fileLoad.style.display = "none";
  fileLoad.addEventListener('change', (event) => {
    const fileList = event.target.files;
    ReadTextFile(fileList[0]);
    event.target.value = "";
  });
  const inputLoad = document.createElement('input');
  inputLoad.id = "town-guide-eu-load";
  inputLoad.type = "button";
  inputLoad.value = "Load";
  inputLoad.onclick = function () {
    fileLoad.click();
  };
  townGuideEuContainer.appendChild(inputLoad);

  const mainContainer = document.querySelector('.maincontainer');
  mainContainer.appendChild(townGuideEuContainer);
}

function ReadTextFile(file) {
  // Check if the file is an image.
  if (file.type && !file.type.startsWith('text/')) {
    alert('File is not a text.', file.type, file);
    console.log('File is not a text.', file.type, file);
    return;
  }

  const reader = new FileReader();
  reader.addEventListener('load', (event) => {
    const layout = JSON.parse(reader.result);
    SetFromTownGuideEu(layout);
  });
  reader.readAsText(file);
}

function GetTownGuideEuLayout(fileName) {
  const validTownGuideEuBiomes = ["forest", "plains", "desert"];
  const biome = document.querySelector("#biomes").value.toLowerCase();
  // Default layout structure
  const layout = {
    "borders": {
      "North": GetTownGuideEuBorderType(grid.northborder),
      "East": GetTownGuideEuBorderType(grid.eastborder),
      "South": GetTownGuideEuBorderType(grid.southborder),
      "West": GetTownGuideEuBorderType(grid.westborder),
    },
    "biome": validTownGuideEuBiomes.includes(biome) ? biome : "forest",
    "name": fileName,
    "stages": [],
    "stageIndex": grid.stageIndex,
    "filename": grid.filename,
  };

  stages.forEach((stage, index) => {
    layout.stages[index] = {
      "index": index,
      "bank": 0,
      "name": stage.name,
      "limits": {},
      "board": GetTownGuideEuBoard(stage),
    };
  });

  return layout
}

function CapitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function GetTownGuideEuBoard(stage) {
  const grid = stage.grid;
  const board = {};
  Object.keys(grid).forEach(key => {
    const z = Math.floor(key / 16);
    const x = key - (z * 16);
    const boardKey = "(" + x + ".0,0.0," + z + ".0)";
    board[boardKey] = { "type": grid[key].type };
    if (grid[key].craft) {
      board[boardKey].data = {
        "craft": grid[key].craft,
        "state": "Complete"
      };
    }
  });
  return board;
}

function GetTownGuideEuBorderType(visualizerBorder) {
  let border = visualizerBorder;
  if (border == "none") {
    border = "OpenWorld";
  }
  return ["none","Desert","Forest"].includes(visualizerBorder) == false ? visualizerBorder : "OpenWorld";
}

function GetVisualizerBorderType(townGuideEuBorder) {
  return townGuideEuBorder == "OpenWorld" ? "none" : townGuideEuBorder;
}

function SetFromTownGuideEu(townGuideEuLayoutObject) {
  grid.biome = townGuideEuLayoutObject.biome ? CapitalizeFirstLetter(townGuideEuLayoutObject.biome) : "Forest";
  grid.northborder = GetVisualizerBorderType(townGuideEuLayoutObject.borders.North);
  grid.southborder = GetVisualizerBorderType(townGuideEuLayoutObject.borders.South);
  grid.eastborder = GetVisualizerBorderType(townGuideEuLayoutObject.borders.East);
  grid.westborder = GetVisualizerBorderType(townGuideEuLayoutObject.borders.West);
  grid.defaultType = "Grass";
  grid.grid = templateGrid.grid;
  grid.filename = townGuideEuLayoutObject.name;
  document.querySelector('#town-guide-eu-filename').value = grid.filename;

  ClearArray(stages);
  const layoutStages = townGuideEuLayoutObject.stages;

  layoutStages.forEach((stage, index) => {
    const grid = [];
    const board = stage.board;
    for (let i = 0; i < dimension; i++) {
      for (let j = 0; j < dimension; j++) {
        const cell = board[`(${j}.0,0.0,${i}.0)`];
        grid.push({
          type: ConvertCorrectionName(cell.type),
          craft: ConvertCorrectionName(cell.data?.craft),
        });
      }
    }
    SetStageData(index, stage.name, grid);
  });

  renderBorders();
  LoadStages();
}

// Right click remove building.
function RightClickRemoveBuilding() {
  const cells = document.querySelectorAll(".cell");

  for (let i = 0, n = cells.length; i < n; i++) {
    const cell = cells[i];
    cell.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      selected = cell.id;
      placeTile("remove");
      renderStats();
      // renderGrid();
    });
  }
}

const stages = [];

function LoadStagesSupport() {
  const stagesContainer = document.createElement('div');
  stagesContainer.id = 'stages-container';

  // stages header
  const header = document.createElement('div');
  header.id = 'stages-header';
  header.textContent = 'Stages';
  stagesContainer.appendChild(header);

  // stages body
  const stageBody = document.createElement('div');
  stageBody.id = 'stages-body';

  stagesContainer.appendChild(stageBody);
  const mainContainer = document.querySelector('.maincontainer');
  mainContainer.appendChild(stagesContainer);

  const stageInfoContainer = document.createElement('div');
  stageInfoContainer.id = 'stage-info-container';

  // stage-manage-container
  const stageManageContainer = document.createElement('div');
  stageManageContainer.id = 'stage-manage-container';

  const stageControlContainer = document.createElement('div');
  stageControlContainer.id = 'stage-control-container';

  const stageMoveUp = document.createElement('div');
  stageMoveUp.id = 'stage-move-up';
  stageMoveUp.textContent = '<';
  stageMoveUp.onclick = function() {
    MoveActiveStageUp();
  };
  stageControlContainer.appendChild(stageMoveUp);

  const stageMoveDown = document.createElement('div');
  stageMoveDown.id = 'stage-move-down';
  stageMoveDown.textContent = '>';
  stageMoveDown.onclick = function() {
    MoveActiveStageDown();
  };
  stageControlContainer.appendChild(stageMoveDown);

  const stageDelete = document.createElement('div');
  stageDelete.id = 'stage-delete';
  stageDelete.onclick = function() {
    DeleteActiveStage();
  };
  stageControlContainer.appendChild(stageDelete);

  stageManageContainer.appendChild(stageControlContainer);

  const stageNameHeader = document.createElement('div');
  stageNameHeader.id = 'stage-name-header';
  stageNameHeader.textContent = 'Name';
  stageManageContainer.appendChild(stageNameHeader);

  const stageNameInput = document.createElement('input');
  stageNameInput.id = 'stage-name';
  stageNameInput.type = 'text';
  stageNameInput.placeholder = 'Stage Name Here';
  stageNameInput.onchange = function() {
    UpdateActiveStageName(this.value);
  };
  stageManageContainer.appendChild(stageNameInput);

  stageInfoContainer.appendChild(stageManageContainer);

  // stage-import-export-container
  const stageImportExportContainer = document.createElement('div');
  stageImportExportContainer.id = 'stage-import-export-container';

  const stageImportExportHeader = document.createElement('div');
  stageImportExportHeader.id = 'stage-import-export-header';
  stageImportExportHeader.textContent = 'Layout';
  stageImportExportContainer.appendChild(stageImportExportHeader);

  const stageImportExportInputText = document.createElement('input');
  stageImportExportInputText.id = 'stage-import-export';
  stageImportExportInputText.type = 'text';
  stageImportExportInputText.placeholder = 'place here';
  stageImportExportInputText.style.width = '65px';
  stageImportExportContainer.appendChild(stageImportExportInputText);

  const stageImportExportCopy = document.createElement('input');
  stageImportExportCopy.id = 'stage-import-export-copy';
  stageImportExportCopy.type = 'button';
  stageImportExportCopy.value = 'Copy';
  stageImportExportCopy.onclick = function() {
    StageCopyToClipboard();
  };
  stageImportExportContainer.appendChild(stageImportExportCopy);

  const stageImportExportLoad = document.createElement('input');
  stageImportExportLoad.id = 'stage-import-export-load';
  stageImportExportLoad.type = 'button';
  stageImportExportLoad.value = 'Load';
  stageImportExportLoad.onclick = function() {
    StageImportGrid();
  };
  stageImportExportContainer.appendChild(stageImportExportLoad);

  stageInfoContainer.appendChild(stageImportExportContainer);

  document.querySelector('.tileinfobody').appendChild(stageInfoContainer);

  HideStageInfo();
}

function StageCopyToClipboard() {
  const copyText = document.querySelector("#stage-import-export");
  copyText.select();
  // copyText.setSelectionRange(0, 99999); /*For mobile devices*/
  document.execCommand("copy");
}

function StageImportGrid() {
  const index = GetActiveStageIndex();
  const importExport = document.querySelector("#stage-import-export").value;
  stages[index].grid = JSON.parse(importExport);
  SetGridByStage(stages[index]);
  renderGrid();
}

function MoveActiveStageUp() {
  const index = GetActiveStageIndex();
  if (
    index >= 0
    && index != 0
  ) {
    const previousIndex = index - 1;
    const previousStage = stages[previousIndex];
    const currentStage = stages[index];
    stages[previousIndex] = currentStage;
    stages[index] = previousStage;
    LoadStages();
    SetActiveStage(previousIndex);
  }
}

function MoveActiveStageDown() {
  const index = GetActiveStageIndex();
  if (
    index >= 0
    && index < stages.length - 1
  ) {
    const nextIndex = index + 1;
    const nextStage = stages[nextIndex];
    const currentStage = stages[index];
    stages[nextIndex] = currentStage;
    stages[index] = nextStage;
    LoadStages();
    SetActiveStage(nextIndex);
  }
}

function DeleteActiveStage() {
  const index = GetActiveStageIndex();
  if (
    index >= 0
    && index <= stages.length - 1
  ) {
    stages.splice(index,1);
    LoadStages();
    const newLastIndex = stages.length - 1;
    const newIndex = index < newLastIndex ? index : newLastIndex;
    SetActiveStage(newIndex);
  }
}

function LoadStages() {
  const stageBody = document.querySelector('#stages-body');
  ClearChildren(stageBody);

  if (stages.length <= 0) {
    // initialize stage.
    SetStageData(0, "First", grid.grid);
  }
  stages.forEach((stage, index) => {
    const stageDiv = document.createElement('div');
    stageDiv.id = 'stage-' + index;
    stageDiv.classList.add('stage');
    stageDiv.textContent = stage.name;
    stageDiv.onclick = function() {
      SetActiveStage(index);
    };
    stageBody.appendChild(stageDiv);
  });
  // Add new stage
  const addStageContainer = document.createElement('div');
  addStageContainer.id = 'add-stage-container';

  const addStageName = document.createElement('input');
  addStageName.id = 'add-stage-name';
  addStageName.type = 'text';
  addStageName.placeholder = 'New Stage Name';
  addStageContainer.appendChild(addStageName);

  const addStageButton = document.createElement('div');
  addStageButton.id = 'add-stage-div';
  addStageButton.onclick = function() {
    AddNewStage();
  };
  addStageContainer.appendChild(addStageButton);

  stageBody.appendChild(addStageContainer);
  SetActiveStage(stages.length - 1);
  updateExportGrid();
}

function AddNewStage() {
  const name = document.querySelector('#add-stage-name').value;
  if (name.length > 0) {
    const index = GetActiveStageIndex();
    const stage = {...stages[index]};
    const newIndex = index + 1;
    stage.name = name;
    stages.splice(newIndex, 0, stage);
    LoadStages();
    SetActiveStage(newIndex);
  }
}

function UpdateActiveStageName(name) {
  if (name.length > 0) {
    const index = GetActiveStageIndex();
    stages[index].name = name;
    LoadStages();
    SetActiveStage(index);
  }
}

function HideStageInfo() {
  document.querySelector('#stage-info-container').style.display = "none";
}

function ShowStageInfo() {
  document.querySelector('#stage-info-container').style.display = "";
}

function GetActiveStageIndex() {
  let activeStageDiv = null;

  const stageDivs = document.querySelectorAll('div.stage');
  stageDivs.forEach(div => {
    if (div.classList.contains('active')) {
      activeStageDiv = div;
    }
  });

  let index = 0;

  if (activeStageDiv) {
    index = parseInt(activeStageDiv.id.replace('stage-', ''));
  } else {
    index = grid.stageIndex;
  }

  return index;
}

function SetActiveStage(index) {
  const stageDivs = document.querySelectorAll('div.stage');
  stageDivs.forEach(div => {
      div.classList.remove('active');
  });

  const lastStageIndex = stages.length - 1;

  if (
    index <= lastStageIndex
    && index >= 0
  ) {
    if (document.querySelector('#stage-' + index)) {
      document.querySelector('#stage-' + index).classList.add('active');
    }

    // clear tile info content
    ClearChildren(document.querySelector('.tileinfopic'));
    const tileInfoTile = document.querySelector('.tileinfotitle');
    ClearChildren(tileInfoTile);
    tileInfoTile.textContent = 'Stage Info';
    ClearChildren(document.querySelector('.recipes'));

    ShowStageInfo();
    document.querySelector('#stage-name').value = stages[index].name;
    document.querySelector('#stage-import-export').value = JSON.stringify(stages[index].grid);

    if (
      index != grid.stageIndex
      || index == lastStageIndex
    ) {
      grid.stageIndex = index;

      SetGridByStage(stages[index]);
      renderGrid();
    }
  }
}

function SetGridByStage(stage) {
  grid.grid = stage.grid.map((cell) => {
    let gridCell = {
      type: cell.type,
      edgeSatisfied: true,
    };
    if (cell.craft) {
      gridCell.craft = cell.craft;
    }
    return gridCell;
  });
}

function SetStageByGrid() {
  const index = GetActiveStageIndex();

  if (index >= 0) {
    stages[index].grid = grid.grid.map((cell) => {
      let gridCell = {
        type: cell.type,
      };
      if (cell.craft) {
        gridCell.craft = cell.craft;
      }
      return gridCell;
    });
  }
}

function SetStageData(index, name, grid) {
  const filteredGrid = grid.map((cell) => {
    let gridCell = { type: ConvertCorrectionName(cell.type) };
    if (cell.craft) {
      gridCell.craft = ConvertCorrectionName(cell.craft);
    }
    return gridCell;
  });
  stages[index] = {
    name: name,
    grid: filteredGrid,
  }
}

function LoadNewLayoutButton() {
  const newLayoutButton = document.createElement('input');
  newLayoutButton.id = 'new-layout';
  newLayoutButton.type = 'button';
  newLayoutButton.value = 'RESET';
  newLayoutButton.onclick = function() {
    if (confirm("This will reset local cache layout, and start as a new layout.  Are you sure?") == true) {
      NewLayout();
    }
  }

  document.querySelector('.startingtemplatecontrols').appendChild(newLayoutButton);
}

function NewLayout() {
  grid = {
    biome: "Forest",
    name: "4x4",
    defaultType: "Grass",
    grid: [],
    northborder: "none",
    southborder: "none",
    eastborder: "none",
    westborder: "none",
    stages: [],
    stageIndex: null,
    filename: defaultTownGuideFilename,
  };
  exportGrid = {
    biome: "Forest",
    name: "export",
    defaultType: "Grass",
    grid: [],
    northborder: "none",
    southborder: "none",
    eastborder: "none",
    westborder: "none",
    stages: [],
    stageIndex: null,
    filename: defaultTownGuideFilename,
  };
  templateGrid = {
    biome: "Forest",
    name: "export",
    defaultType: "Grass",
    grid: [],
    northborder: "none",
    southborder: "none",
    eastborder: "none",
    westborder: "none",
    stages: [],
    stageIndex: null,
    filename: defaultTownGuideFilename,
  };
  overlayMode = "none";
  dimension = 16;
  selectedCategory = "Farm";
  selected = "";
  selectedBuilding = "";
  biome = "Forest";
  direction = "north";
  document.querySelector('#biomes').value = biome;
  document.querySelector('#directons').value = direction;
  initialize();
  showCategoryMenu(selectedCategory);
  ClearArray(stages);
  LoadStages();
  updateExportGrid();
  importGrid();
  RightClickRemoveBuilding();
}



// Start of LoadVisualizerAddonByTruckTonkaAndLowCat
// TS Visualizer Addon 1.29 by TruckTonka, LowCat
var prevGrid = [];
var newButtonDefn;

function LoadVisualizerAddonByTruckTonkaAndLowCat() {
  var contentText = "";
  const txtArea = createEmbedElm("<textarea id=\"display-txtArea\" rows=\"49\" cols=\"35\"></textarea>", "div-display-txtArea", "display-txtArea", contentText, null);
  const newContainer = document.createElement('div');
  newContainer.className = 'TSV_Operation_DisplayInfo';
  newContainer.appendChild(txtArea);
  document.querySelector('#layout-container').appendChild(newContainer);

  if (document.querySelector("#MainGrid") != null) {
    if (typeof(grid) !== "undefined") {
      if ((prevGrid.length == 0) && (grid.grid.length == 256)) {
        rememberGrid();
        const rotateBtn = createElm("button", "rotate-btn", "Rotate", ()=>{rotateLayout()});
        const flipNSBtn = createElm("button", "flipN-btn", "Flip NS", ()=>{flipLayoutNS()});
        const flipEWBtn = createElm("button", "flipEW-btn", "Flip EW", ()=>{flipLayoutEW()});
        const displayBtn = createElm("button", "display-btn", "Display Details", ()=>{displayInfo()});

        const newContainer = document.createElement('div');
        newContainer.className = 'TSV_Operation';
        newContainer.style.paddingTop = '.1rem';
        newContainer.appendChild(rotateBtn);
        newContainer.appendChild(flipNSBtn);
        newContainer.appendChild(flipEWBtn);
        newContainer.appendChild(displayBtn);
        document.querySelector('.maincontainer').appendChild(newContainer);
      }
    }
  }
}

function createElm(tag, id, text, onClickAction) {
    const theElm = document.createElement(tag);
    theElm.id = id;
    theElm.innerText = text;
    if(onClickAction) {
        theElm.addEventListener('click', onClickAction);
    }
    theElm.style.marginRight = '.1rem'
    return theElm;
}

// create div with embeded element
function createEmbedElm(innerTag, div_id, inner_id, value, onClickAction) {
    var theElm = document.querySelector("#"+div_id);

    if (theElm == null) {
        theElm = document.createElement('div');
        theElm.id = div_id;
        theElm.innerHTML = innerTag;
        const theEmbedElm = theElm.querySelector("#"+inner_id);

        theEmbedElm.value = value;
        if(onClickAction) {
            theEmbedElm.addEventListener('click', onClickAction);
        }
        theElm.style.marginRight = '.1rem'
    }
    return theElm;
}

// rotate the current layout and refresh the screen
function rotateLayout() {
    //console.log("*** function rotateLayout");
    var i,x,y;
    var tempBorder = grid.southborder;
    grid.southborder = grid.eastborder;
    grid.eastborder = grid.northborder;
    grid.northborder = grid.westborder;
    grid.westborder = tempBorder;

    for (i=0; i<256; i++) {
        x = Math.round(i/16 + 0.5) - 1;
        y = i % 16;
        // prevGrid[i] = grid.grid[16*(15-y) + x].type;
        initPrevGrid(i);
        prevGrid[i].type = grid.grid[16*(15-y) + x].type;
        prevGrid[i].craft = grid.grid[16*(15-y) + x].craft;
    };
    updateGrid();
    renderBorders();
    renderGrid();
    updateExportGrid();
}

// flip the town upside down
function flipLayoutNS() {
    console.log ("*** function rememberGrid");
    var i,x,y;
    var tempBorder = grid.southborder;
    grid.southborder = grid.northborder;
    grid.northborder = tempBorder;
    for (i=0; i<256; i++) {
        x = Math.round(i/16 + 0.5) - 1;
        y = i % 16;
        // prevGrid[i] = grid.grid[16*(15-x) + y].type;
        initPrevGrid(i);
        prevGrid[i].type = grid.grid[16*(15-x) + y].type;
        prevGrid[i].craft = grid.grid[16*(15-x) + y].craft;
    };
    updateGrid();
    renderBorders();
    renderGrid();
    updateExportGrid();
};

// flip the town left and right
function flipLayoutEW() {
    //console.log ("*** function rememberGrid");
    var i,x,y;
    var tempBorder = grid.eastborder;
    grid.eastborder = grid.westborder;
    grid.westborder = tempBorder;
    for (i=0; i<256; i++) {
        x = Math.round(i/16 + 0.5) - 1;
        y = i % 16;
        // prevGrid[i] = grid.grid[16*x + (15-y)].type;
        initPrevGrid(i);
        prevGrid[i].type = grid.grid[16*x + (15-y)].type;
        prevGrid[i].craft = grid.grid[16*x + (15-y)].craft;
    };
    updateGrid();
    renderBorders();
    renderGrid();
    updateExportGrid();
};

// Update the current grid layout
function updateGrid() {
    //console.log ("*** function updateGrid");
    var i;
    for (i=0; i<256; i++) {
        // grid.grid[i].type = prevGrid[i];
        initPrevGrid(i);
        grid.grid[i].type = prevGrid[i].type;
        grid.grid[i].craft = prevGrid[i].craft;
    }
}

// Remeber the previous grid layout
function rememberGrid() {
    //console.log ("*** function rememberGrid");
    var i;
    for (i=0; i<256; i++) {
        // prevGrid[i] = grid.grid[i].type;
        initPrevGrid(i);
        prevGrid[i].type = grid.grid[i].type;
        prevGrid[i].craft = grid.grid[i].craft;
    }
}

function initPrevGrid(index) {
    if (prevGrid[index] == undefined) {
        prevGrid[index] = {
            type: undefined,
            craft: undefined,
        };
    }
}

//extract the cell index
function parseCellIndex(cellName) {
    //console.log ("*** cellName.substring(0, 4) = " + cellName.substring(0, 4));
    if (cellName.substring(0, 4) == "cell") {
        return parseInt(cellName.substr(4));
    } else {
        return null;
    }
}
function displayInfo() {
    var contentText = "";

    if (getCellIndex() != null) {
        console.log("*** Selected cell position: ("+getCellIndex() % 16+","+ (Math.round(getCellIndex()/16 + 0.5) - 1)+")");

        contentText += "*** Selected cell position: ("+getCellIndex() % 16+","+ (Math.round(getCellIndex()/16 + 0.5) - 1)+")\n\n";
    }
    var units={};
    var totalBuildCost=0;
    var totalLabourCost=0;
    for (const i in grid.grid) {
        // if unit types is not maped, initialize it
        if (!units[grid.grid[i].type]){
            units[grid.grid[i].type] = 0;
        }
        units[grid.grid[i].type]++;
        // some entry, the buildcost field is string instead of number.
        totalBuildCost = totalBuildCost + Number(townstarObjects[grid.grid[i].type].BuildCost);
        totalLabourCost = totalLabourCost + Number(townstarObjects[grid.grid[i].type].LaborCost);
    }
    if (
        appliedUtilities.Cost &&
        appliedUtilities.Cost.Global
    ) {
        totalBuildCost = totalBuildCost * (100 + appliedUtilities.Cost.Global) / 100;
    }
    if (
        appliedUtilities.Wages &&
        appliedUtilities.Wages.Global
    ) {
        totalLabourCost = totalLabourCost * (100 + appliedUtilities.Wages.Global) / 100;
    }

    console.log("*** Total build cost: \n$" + totalBuildCost.toLocaleString("en-US") + "\n\n");
    console.log("*** Total labour cost/min: \n$" + totalLabourCost.toLocaleString("en-US") + "\n\n");
    console.log("*** Object counts:\n" + JSON.stringify(Object.fromEntries(Object.entries(units).sort()), null, "   "));
    contentText += "*** Total build cost: \n$" + totalBuildCost.toLocaleString("en-US") + "\n\n";
    contentText += "*** Total labour cost/min: \n$" + totalLabourCost.toLocaleString("en-US") + "\n\n";
    contentText += "*** Object counts:\n" + JSON.stringify(Object.fromEntries(Object.entries(units).sort()), null, "   ");

    var theElm = document.querySelector("#div-display-txtArea");

    // refresh value instead of recreate if found to exist
    if (theElm != null) {
        const theEmbedElm = theElm.querySelector("#display-txtArea");

        theEmbedElm.value = contentText;
    } else {
        const txtArea = createEmbedElm("<textarea id=\"display-txtArea\" rows=\"51\" cols=\"35\"></textarea>", "div-display-txtArea", "display-txtArea", contentText, null);
        const newContainer = document.createElement('div');
        newContainer.className = 'TSV_Operation_DisplayInfo';
        newContainer.style.paddingTop = '.1rem';
        newContainer.style.display = 'grid';
        newContainer.style.gridColumn = '3/3';
        newContainer.style.gridRow = '1/5';
        newContainer.appendChild(txtArea);
        document.querySelector('.maincontainer').appendChild(newContainer);
    }

    ShowInfoLayoutContent();
};
// End of LoadVisualizerAddonByTruckTonkaAndLowCat

// Versioning
const version = "testing";
const versionDiv = document.createElement("div");
versionDiv.id = "addon-version";
versionDiv.textContent = "Addon v" + version;
// document.querySelector(".maincontainer").appendChild(versionDiv);
