import DataGrid, { Column, Paging } from 'devextreme-react/data-grid';
import Input from './../ui/Input';
import { FaPercentage } from 'react-icons/fa';
import styled from 'styled-components';
import { addDays } from 'date-fns';
import { useEffect } from 'react';

const Per = styled.div`
  background: #6366f1;
  padding: 10.3px 10px;
  color:white;
  border: 1px solid #6366f1;
`;
const ContainerPer = styled.div`
display: flex;
`;
function RunTimeTable({ data, setData, loading }) {
  useEffect(() => {
    setData(adjustPercentages(data));
  }, data)
  function adjustPercentages(newData) {
    let totalPercentage = newData.reduce(
      (sum, item) => sum + parseFloat(item.percentage),
      0
    );

    if (totalPercentage < 100) {
      const deficit = (100 - totalPercentage).toFixed(2);
      newData[newData.length - 1].percentage = (
        parseFloat(newData[newData.length - 1].percentage) + parseFloat(deficit)
      ).toFixed(2);
    }

    newData.forEach((item) => {
      if (item.percentage < 1) {
        item.percentage = 1;
      }
    });

    return newData;
  }

  const ChartCell = (cellData) => {
    function handleKeyDown(e) {
      if (e.key === 'Enter') {
        handleChange(e);
      }
    }

    function handleChange(e) {
      let newPercentage = parseFloat(Number(e.currentTarget.value).toFixed(2)); // Ensure 2 decimal places
      if (newPercentage < 1) newPercentage = 1; // Prevent percentage from being less than 1

      const newData = [...data];
      const index = newData.findIndex((item) => item.id === cellData.data.id);

      // Update the percentage of the current row
      newData[index] = {
        ...newData[index],
        percentage: newPercentage,
      };

      // Calculate the total percentage of all rows
      let totalPercentage = newData.reduce(
        (sum, item) => sum + parseFloat(item.percentage),
        0
      );

      // If the total percentage exceeds 100, we will need to reduce percentages to fit
      if (totalPercentage > 100) {
        let excess = totalPercentage - 100;
        // Distribute the excess percentage evenly by reducing from rows
        for (let i = newData.length - 1; i >= 0; i--) {
          if (excess > 0) {
            const currentValue = parseFloat(newData[i].percentage);
            const maxReduce = currentValue - 1; // Ensure no percentage goes below 1
            const reduction = Math.min(excess, maxReduce);
            newData[i].percentage = (currentValue - reduction).toFixed(2);
            excess -= reduction;
          }
        }
      }

      // If the total percentage is less than 100, we need to increase the last row's percentage
      if (totalPercentage < 100) {
        let deficit = 100 - totalPercentage;
        // Distribute the deficit percentage by adding to the last row
        newData[newData.length - 1].percentage = (
          parseFloat(newData[newData.length - 1].percentage) + deficit
        ).toFixed(2);
      }

      // Ensure no percentage is less than 1
      newData.forEach((item) => {
        if (item.percentage < 1) {
          item.percentage = 1;
        }
      });

      setData(adjustPercentages(newData));
    }

    return (
      <ContainerPer>
        <Input
          type="text"
          style={{ width: '100%', borderRadius: '0px' }}
          defaultValue={cellData.key.percentage}
          onBlur={handleChange}
          onKeyDown={handleKeyDown}
          min={1}
          max={100}
          step={0.01}
        />
        <Per>
          <FaPercentage />
        </Per>
      </ContainerPer>
    );
  };

  // Handle start date change
  function handleStartDateChange(e, cellData) {
    const selectedDate = new Date(e.target.value);
    const newData = [...data];
    const index = newData.findIndex((item) => item.id === cellData.data.id);

    // Update the startDate and endDate of the current row
    newData[index] = {
      ...newData[index],
      startDate: selectedDate.toISOString().split('T')[0],
      endDate: addDays(selectedDate, 1).toISOString().split('T')[0], // endDate 1 day after startDate
    };

    // Update the rows after the modified row
    for (let i = index + 1; i < newData.length; i++) {
      const newStartDate = addDays(new Date(newData[i - 1].endDate), 1).toISOString().split('T')[0];
      const newEndDate = addDays(new Date(newData[i - 1].endDate), 2).toISOString().split('T')[0];

      newData[i] = {
        ...newData[i],
        startDate: newStartDate,
      };
      if (newData[i].endDate <= newEndDate) {
        newData[i] = {
          ...newData[i],
          endDate: newEndDate,
        };
      }
    }

    setData(newData);
  }
  // Handle end date change
  function handleEndDateChange(e, cellData) {
    const selectedDate = new Date(e.target.value);
    const newData = [...data];
    const index = newData.findIndex((item) => item.id === cellData.data.id);

    // Update the endDate of the current row
    newData[index] = {
      ...newData[index],
      endDate: selectedDate.toISOString().split('T')[0],
    };

    // Update the rows after the modified row
    for (let i = index + 1; i < newData.length; i++) {
      const newStartDate = addDays(new Date(newData[i - 1].endDate), 1).toISOString().split('T')[0];
      const newEndDate = addDays(new Date(newData[i - 1].endDate), 2).toISOString().split('T')[0];
      newData[i] = {
        ...newData[i],
        startDate: newStartDate, // Ensure startDate is 1 day after previous row's endDate
      };
      if (newData[i].endDate <= newEndDate) {
        newData[i] = {
          ...newData[i],
          endDate: newEndDate,
        };
      }
    }

    setData(newData);
  }
  function StartDateCell(cellData) {
    const index = data.findIndex((item) => item.id === cellData.data.id);
    const minDate = index === 0 ? null : addDays(new Date(data[index - 1].endDate), 1).toISOString().split('T')[0];
    return (
      <>
        <Input
          type="date"
          style={{ width: '100%', borderRadius: '0px' }}
          defaultValue={cellData.key.startDate}
          onChange={(e) => handleStartDateChange(e, cellData)}
          min={minDate}
        />
      </>)

  }
  function EndDateCell(cellData) {
    const index = data.findIndex((item) => item.id === cellData.data.id);
    const minDate = addDays(new Date(data[index].startDate), 1).toISOString().split('T')[0];

    return (
      <>
        <Input
          type="date"
          style={{ width: '100%', borderRadius: '0px' }}
          defaultValue={cellData.key.endDate}
          onChange={(e) => handleEndDateChange(e, cellData)}
          min={minDate}
        // onChange={(e) => console.log(e.target.value)}
        // min={new Date().toISOString().split('T')[0]}
        />
      </>)

  }
  
  const handleDevContentReady = (e) => {
    const grid = e.component;
    const headerRow = grid._$element.find(".dx-datagrid-headers");
    if (!headerRow.find(".custom-header-row").length) {
      headerRow.append('<div class="custom-header-row"><div class="dx-header-cell">All Percentages 100</div></div>');
    }
  };
  return (
    <>
      <DataGrid
        id="DivRunTimeTable"
        dataSource={data}
        showBorders={true}
        rowAlternationEnabled={true}
        defaultSearchPanel={{ visible: false }}
        searchPanel={{ visible: false }}
        idField="id"
        rtlEnabled={true}
        disabled={loading}
        onContentReady={handleDevContentReady} >

        <div className="dx-datagrid-headers">
          <div className="dx-header-row">
            <div className="dx-header-cell">
              <span>All Percentages 100</span>
            </div>
          </div>
        </div>

        <Column dataField="id" caption="ID" visible={false} width={50} allowSorting={false} />
        <Column dataField="paymentType" caption="نوع الدفع" allowSorting={false} />
        <Column dataField="year" caption="العام الدراسي" allowSorting={false} />
        <Column dataField="branchs" caption="الفروع" allowSorting={false} />
        <Column dataField="educationTypes" caption="نوع التعليم" allowSorting={false} />

        <Column
          dataField="percentage"
          caption="النسبة"
          minWidth={150}
          cellRender={ChartCell} allowSorting={false}
        />
        <Column
          dataField="startDate"
          caption="تاريخ البدء"
          minWidth={220}
          cellRender={StartDateCell} allowSorting={false}
        />
        <Column
          dataField="endDate"
          caption="تاريخ الانتهاء"
          minWidth={220}
          cellRender={EndDateCell} allowSorting={false}
        />
        <Paging defaultPageSize={10} />
      </DataGrid>
    </>
  );
}

export default RunTimeTable;



// newData[index + 1].startDate = addDays(new Date(newData[index].endDate), 1).toISOString().split('T')[0];
// newData[index+1].endDate=addDays(new Date(newData[index+1].startDate),1).toISOString().split('T')[0];
// newData = newData.map((item, idx) => {
//   if (item.id> cellData.data.id)
//     return {...item,startDate:addDays(new Date(newData[idx-1].endDate),1).toISOString().split('T')[0],endDate:addDays(new Date(newData[idx-1].endDate),2).toISOString().split('T')[0]}
//   return item;
// })