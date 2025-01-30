import DataGrid, { Column, Paging } from 'devextreme-react/data-grid';
import Input from './../ui/Input';
import { FaPercentage } from 'react-icons/fa';
import styled from 'styled-components';
import { addDays } from 'date-fns';
import { useEffect } from 'react';
import { DateBox } from 'devextreme-react/date-box';
import 'devextreme/dist/css/dx.common.css';

const ContainerPercentageIcon = styled.div`
  // background: #6366f1;
  // color:white;
  // border: 1px solid #6366f1;
    background: #ececec;
    color: #757575;
    border: 1px solid #dddddd;
    padding: 10.3px 10px;
`;
const ContainerPer = styled.div`
display: flex;
`;
function RunTimeTable({ data, setData, loading }) {

  function adjustPercentages(newData) {
    let totalPercentage = newData.reduce(
      (sum, item) => sum + parseFloat(item.percentage),
      0
    );

    if (totalPercentage < 100) {
      const deficit = (100 - totalPercentage).toFixed(2);
      newData[newData.length - 1].percentage = parseFloat((
        parseFloat(newData[newData.length - 1].percentage) + parseFloat(deficit)
      ).toFixed(2));
    }

    newData.forEach((item) => {
      if (item.percentage < 1) {
        item.percentage = 1;
      }
    });

    return newData;
  }

  useEffect(() => {
    setData(adjustPercentages(data));
  }, [data, setData]);


  const percentageCell = (cellData) => {
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
            newData[i].percentage = parseFloat((currentValue - reduction).toFixed(2));
            excess -= reduction;
          }
        }
      }

      // If the total percentage is less than 100, we need to increase the last row's percentage
      if (totalPercentage < 100) {
        let deficit = 100 - totalPercentage;
        // Distribute the deficit percentage by adding to the last row
        newData[newData.length - 1].percentage = parseFloat((
          parseFloat(newData[newData.length - 1].percentage) + deficit
        ).toFixed(2));
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
        <ContainerPercentageIcon>
          <FaPercentage />
        </ContainerPercentageIcon>
      </ContainerPer>
    );
  };

  // Handle start date change
  function handleStartDateChange(e, cellData) {
    const selectedDate = new Date(e.value);
    const newData = [...data];
    const index = newData.findIndex((item) => item.id === cellData.data.id);

    // Update the startDate and endDate of the current row
    const newEndDateOfCurrentRow = addDays(selectedDate, 1).toISOString().split('T')[0];
    
    newData[index] = {
      ...newData[index],
      startDate: selectedDate.toISOString().split('T')[0],
    };

    if (newData[index].endDate <= newEndDateOfCurrentRow) {
      newData[index] = {
        ...newData[index],
        endDate: newEndDateOfCurrentRow,
      };
    }
    // Update End Date the rows before if exists
    if (index > 0) {
      const previousRow = newData[index - 1];
      const newEndDateForPreviousRow = new Date(selectedDate);
      newEndDateForPreviousRow.setDate(newEndDateForPreviousRow.getDate() - 1); 
  
      // Update the previous row's end date
      newData[index - 1] = {
        ...previousRow,
        endDate: newEndDateForPreviousRow.toISOString().split('T')[0],
      };
    }
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
    const selectedDate = new Date(e.value);
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

  function startDateCell(cellData) {
    const index = data.findIndex((item) => item.id === cellData.data.id);
    const minDate = index === 0 ? null : addDays(new Date(data[index - 1].endDate), 1).toISOString().split('T')[0];
    return (
      <>
        <DateBox
          type="date"
          style={{ width: '100%', borderRadius: '0px' }}
          defaultValue={cellData.key.startDate}
          onValueChanged={(e) => handleStartDateChange(e, cellData)}
          min={minDate}
          displayFormat="yyyy-MM-dd"
        />
      </>)

  }
  function endDateCell(cellData) {
    const index = data.findIndex((item) => item.id === cellData.data.id);
    const minDate = addDays(new Date(data[index].startDate), 1).toISOString().split('T')[0];

    return (
      <>
        <DateBox
          type="date"
          style={{ width: '100%', borderRadius: '0px' }}
          defaultValue={cellData.key.endDate}
          onValueChanged={(e) => handleEndDateChange(e, cellData)}
          min={minDate}
          displayFormat="yyyy-MM-dd"
        />
      </>)

  }

  const handleDevContentReady = (e) => {
    const grid = e.component;
    const dataSource = grid.option("dataSource");
    let firstPaymentType = 'لم يتم الإختيار';
    let firstYear = 'لم يتم الإختيار';
    if (!(!dataSource || dataSource.length === 0)) {
      firstPaymentType = dataSource[0].paymentType;
      firstYear = dataSource[0].year;
    }
    const headerRow = grid._$element.find(".dx-datagrid-headers");
    if (!headerRow.find(".custom-header-row").length) {
      headerRow.append(`<div class="custom-header-row"><div class="dx-header-cell">نظــام الدفع: &nbsp;&nbsp; ${firstPaymentType} &nbsp;&nbsp;| &nbsp;&nbsp; العــام الدراسي: &nbsp;&nbsp; ${firstYear}</div></div>`);
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

        <Column dataField="paymentType" caption="نوع الدفع" visible={false} allowSorting={false} />
        <Column dataField="year" caption="العام الدراسي" visible={false} allowSorting={false} />
        <Column dataField="branchs" caption="الفـــروع" allowSorting={false} />
        <Column dataField="educationTypes" caption="نـوع التعليــم" allowSorting={false} />
        <Column dataField="id" caption="رقـم الدفعــة" allowSorting={false} />
        <Column
          dataField="percentage"
          caption="النســبة"
          minWidth={150}
          cellRender={percentageCell} allowSorting={false}
        />
        <Column
          dataField="startDate"
          caption="تاريــخ البــدء"
          minWidth={220}
          cellRender={startDateCell} allowSorting={false}
        />
        <Column
          dataField="endDate"
          caption="تاريــخ الانتهــاء"
          minWidth={220}
          cellRender={endDateCell} allowSorting={false}
        />
        <Paging defaultPageSize={10} />
      </DataGrid>
    </>
  );
}

export default RunTimeTable;


