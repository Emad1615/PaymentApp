export const groupBy = (data, keys) =>
{
    const groups = data.reduce((result, item) =>
    {
        const groupKey = keys.map(key => item[key]).join('-');
        if (!result[groupKey])
        {
            result[groupKey] = [];
        }
        result[groupKey].push(item);
        return result;
    }, {})
    var groupedData = Object.keys(groups).map(groupKey => { return groups[groupKey][0]; });
    return groupedData;
};