function hashStringToInt(str, tableSize) {
  let hash = 17;
  for (let i = 0; i < str.length; i++) {
    hash = (13 * hash * str.charCodeAt(i)) % tableSize;
  }
  return hash;
}

function isKeyPairValueExistInHashTable(table, keyParam, valueParam) {
  var isExist = false;
  var paramsAsString = keyParam.toString() + valueParam.toString(); //Check as concetination
  if (table) {
    table.forEach(item => {
      const pair = item;
      if (isValueValid(pair)) {
        // Check if pair is empty, terminate
        i = table.length - 1;
      } else {
        for (let j = 0; j < pair.length; j++) {
          var keyValuePair = pair[j];
          if (isValueValid(keyValuePair)) {
            var keyValueStr = keyValuePair[0];
            var valValueStr = keyValuePair[1];
            var oldStr = keyValueStr.toString() + valValueStr.toString();
            if (oldStr === paramsAsString) {
              isExist = true;
              i = table.length - 1;
            }
          }
        }
      }
    });
    return isExist;
  }
}

function isValueValid(pair) {
  return pair !== null && pair !== undefined;
}

function isKeyExistInHashTable(table, keyParam) {
  var isExist = false;
  var paramsAsString = keyParam.toString();
  if (table) {
    table.forEach(item => {
      const pair = item;
      if (isValueValid(pair)) {
        // Check if pair is empty, terminate
        i = table.length - 1;
      } else {
        for (let j = 0; j < pair.length; j++) {
          var keyValuePair = pair[j];
          if (isValueValid(keyValuePair)) {
            var keyValueStr = keyValuePair[0];
            var oldStr = keyValueStr.toString();
            if (oldStr === paramsAsString) {
              isExist = true;
              i = table.length - 1;
            }
          }
        }
      }
    });
    return isExist;
  }
}

class HashTable {
  table = new Array(3);
  numItems = 0;

  resize = () => {
    const newTable = new Array(this.table.length * 2);
    this.table.forEach(item => {
      if (item) {
        item.forEach(([key, value]) => {
          const index = hashStringToInt(key, newTable.length);
          if (newTable[index]) {
            newTable[index].push([key, value]);
          } else {
            newTable[index] = [[key, value]];
          }
        });
      }
    });
    this.table = newTable;
  };

  getSize = () => {
    return this.numItems;
  };

  clear = () => {
    this.table = [];
    this.numItems = 0;
  };

  removeItem = key => {
    var isKeyExist = isKeyExistInHashTable(this.table, key);
    if (!isKeyExist) console.log("The key " + key + " is not exist in table");
    else {
      this.table.forEach((pair, index) => {
        //For each pair
        for (let i = 0; i < pair.length; i++) {
          //Search inside each pair to find key
          var element = pair[i];
          var keyValueOfElement = element[0];
          if (key === keyValueOfElement) {
            this.table[index].splice(i, 1);
            this.numItems--;
          }
        }
      });
    }
  };

  isEmpty = () => {
    return this.numItems === 0;
  };

  isContainKey = key => {
    var isKeyExist = false;
    this.table.forEach((pair, index) => {
      //For each pair
      for (let i = 0; i < pair.length; i++) {
        //Search inside each pair to find key
        var element = pair[i];
        var keyValueOfElement = element[0];
        if (key === keyValueOfElement) {
          isKeyExist = true;
        }
      }
    });
    return isKeyExist;
  };

  isContainValue = value => {
    var isValueExist = false;
    this.table.forEach((pair, index) => {
      //For each pair
      for (let i = 0; i < pair.length; i++) {
        //Search inside each pair to find key
        var element = pair[i];
        var valueInHash = element[1]; //0 is key 1 is value
        if (value === valueInHash) {
          isValueExist = true;
        }
      }
    });
    return isValueExist;
  };

  setItem = (keyParam, valueParam) => {
    //Check if value key value pair is same
    var sameValue = isKeyPairValueExistInHashTable(
      this.table,
      keyParam,
      valueParam
    );
    if (sameValue) return null;
    else {
      const loadFactor = this.numItems / this.table.length;
      if (loadFactor > 0.8) {
        //resize
        this.resize();
      }
      //Add Value
      const index = hashStringToInt(keyParam, this.table.length);
      var isExistInTableOnIndex = this.table[index];
      this.numItems++;
      if (isExistInTableOnIndex) {
        this.table[index].push([keyParam, valueParam]);
      } else {
        this.table[index] = [[keyParam, valueParam]];
      }
    }
  };

  getItem = key => {
    const index = hashStringToInt(key, this.table.length);
    if (!this.table[index]) return null;
    var item = this.table[index];
    for (let i = 0; i < item.length; i++) {
      const pairValue = item[i];
      if (key === pairValue[0]) {
        return pairValue[1];
      }
    }
  };
}
const myTable = new HashTable();
myTable.setItem("firstName", "Cagri");
myTable.setItem("lastName", "Guvendik");
myTable.setItem("age", 32);
myTable.setItem("birth", "1/2/3");
myTable.setItem("sex", "male");
myTable.setItem("identityNo", "123");
myTable.setItem("job", "engineer");
myTable.setItem("title", "master");
console.log("isContain key job", myTable.isContainKey("job"));
console.log("isContain value engineer", myTable.isContainValue("engineer"));
console.log("isEmpty", myTable.isEmpty());
