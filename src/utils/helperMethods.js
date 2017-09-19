// @flow

export function countStatus(history: Array<{}>, status: number) {
  if (history === []) {
    return 0;
  }
  return history.filter(h => h.HTTPCode === status).length;
}

export function countStatusBetween(history: Array<{}>, status: object) {
  if (history === []) {
    return 0;
  }
  return history.filter(h => h.HTTPCode >= status.min && h.HTTPCode <= status.max).length;
}

export function getDestination(source: string) {
  let destination: string;
  switch (source) {
    case 'ENT':
      destination = 'Enterprises';
      break;
    case 'LEU':
      destination = 'LegalUnits';
      break;
    case 'VAT':
      destination = 'Vats';
      break;
    case 'PAYE':
      destination = 'Payes';
      break;
    case 'CH':
      destination = 'Companies';
      break;
    default:
      destination = 'Enterprises';
  }
  return destination;
}

export function formatResultsTable(results: Array<{}>) {
  const formattedResults: Array<{}> = [];
  results.forEach((i) => {
    const record: Object = i;
    if (record.source === 'VAT' || record.source === 'Legal Unit') {
      record.name = record.businessName;
    }
    formattedResults.push(record);
  });
  return formattedResults;
}

export function getValueByKey(object: {}, toGet: string) {
  return (toGet in object) ? object[toGet] : '';
}

export function getChildValues(json: {}, compareString: string) {
  const arr: Array<{}> = [];
  Object.keys(json).forEach((k) => {
    if (json[k] === compareString) {
      const obj: {} = {};
      obj[compareString] = k;
      arr.push(obj);
    }
  });
  return arr;
}

export function getLegalStatusDescription(status: string) {
  switch (status) {
    case '1':
      return 'Company';
    case '2':
      return 'Sole Proprietor';
    case '3':
      return 'Partnership';
    case '4':
      return 'Public Corporation';
    case '5':
      return 'Central Government';
    case '6':
      return 'Local Authority';
    case '7':
      return 'Non-Profit Body';
    default:
      return 'Not Allocated';
  }
}

export function getHeight(noOfItems: number) {
  if (noOfItems > 10) {
    return '400px';
  }
  return '100%';
}

export function findAndReplace(object: {}, value: string, replacevalue: string) {
  for (var x in object) {
    if (object.hasOwnProperty(x)) {
      if (typeof object[x] == 'object') {
        findAndReplace(object[x], value, replacevalue);
      }
      if (object[value]) {
        object[replacevalue] = object[value] + ' ' + object['id'];
        // id gets overwritten by react-d3-tree, so use newId instead
        object['newId'] = object['id'];
        // delete object[value];
      }
    }
  }
}

export function colourNode(node, id, index, searchTerm, colour, entryNode) {
  try {
    if (node[index].innerHTML.indexOf(searchTerm) !== -1) {
      document.getElementById(id).style.fill = colour;
      if (entryNode) {
        // On the entry node, increase the size of the circle and move
        // the text out of the way of the circle
        document.getElementById(id).childNodes[1].r.baseVal.value = 20;
        document.getElementById(id).childNodes[0].x.baseVal[0].value = 25;
      }
    }
  } catch (e) {
    // e
  }
}
