import _ from "lodash";
// this client side pagination
export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  // we can also make use of chaining of methods in the lodash
  //  lodash its often assigned to _
  return _(items)
    .slice(startIndex)
    .take(pageSize)
    .value();
  // _.slice(item, startIndex)
  // _.take()
}
