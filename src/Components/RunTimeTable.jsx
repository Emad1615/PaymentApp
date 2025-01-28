import DataGrid, { Column, Paging } from 'devextreme-react/data-grid';
import Input from './../ui/Input';
import { FaPercentage } from 'react-icons/fa';
import styled from 'styled-components';
import { addDays } from 'date-fns';

const Per = styled.div`
  background: #6366f1;
  padding: 10.3px 10px;
  color:white;
  border: 1px solid #6366f1;
`;
const ContainerPer = styled.div`
display: flex;
`;
function RunTimeTable({ data, setData, loading, paymentLength }) {
  const ChartCell = (cellData) => {
    function handleChange(e) {
      const newPercentage = parseFloat(
        Number(e.currentTarget.value).toFixed(2),
      ); // Ensure 2 decimal places
      const newData = [...data];

      const index = newData.findIndex((item) => item.id === cellData.data.id);

      newData[index] = {
        ...newData[index],
        percentage: parseFloat(newPercentage),
      };

      let totalPercentage = newData.reduce(
        (sum, item) => sum + parseFloat(item.percentage),
        0,
      );

      if (totalPercentage > 100) {
        const adjustment = (totalPercentage - 100).toFixed(2);

        if (index < newData.length - 1) {
          newData[index + 1].percentage = (
            parseFloat(newData[index + 1].percentage) - parseFloat(adjustment)
          ).toFixed(2);
        } else {
          newData[index - 1].percentage = (
            parseFloat(newData[index - 1].percentage) - parseFloat(adjustment)
          ).toFixed(2);
        }
      }

      totalPercentage = newData.reduce(
        (sum, item) => sum + parseFloat(item.percentage),
        0,
      );

      if (totalPercentage > 100) {
        newData[0].percentage = (
          parseFloat(newData[0].percentage) -
          (totalPercentage - 100)
        ).toFixed(2);
      }

      if (totalPercentage < 100) {
        const diff = (100 - totalPercentage).toFixed(2);
        newData[newData.length - 1].percentage = parseFloat(
          (
            parseFloat(newData[newData.length - 1].percentage) +
            parseFloat(diff)
          ).toFixed(2),
        );
      }

      setData(newData);
    }

   

    return (
      <ContainerPer>
        <Input
          type="text"
          style={{ width: '100%', borderRadius: '0px' }}
          defaultValue={cellData.key.percentage}
          onBlur={handleChange}
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
  
  function StartDateCell(cellData){
    function handleStartDateChange(e) { 
      const selectedDate = new Date(e.target.value);
      const newData = [...data];
      const index = newData.findIndex((item) => item.id === cellData.data.id);
      newData[index] = {
        ...newData[index],
        startDate: selectedDate.toISOString().split('T')[0],
        endDate: addDays(selectedDate, 1).toISOString().split('T')[0], 
      };
      for (let i = index + 1; i < newData.length; i++) {
        newData[i] = {
          ...newData[i],
          startDate: addDays(new Date(newData[i - 1].endDate), 1).toISOString().split('T')[0], 
          endDate: addDays(new Date(newData[i - 1].endDate), 2).toISOString().split('T')[0],  
        };
      }
      if (index > 0) {
        newData[index - 1] = {
          ...newData[index - 1],
          endDate: addDays(selectedDate, -1).toISOString().split('T')[0], 
          startDate: addDays(new Date(newData[index - 1].endDate), -2).toISOString().split('T')[0],  
        };
      }
      setData(newData);  
    }
    return(
      <>
        <Input
          type="date"
          style={{ width: '100%', borderRadius: '0px' }}
          defaultValue={cellData.key.startDate}
          onChange={handleStartDateChange}
          min={new Date().toISOString().split('T')[0]}
        />
      </>)

  }
 

  function EndDateCell(cellData){
    return(
      <>
        <Input
          type="date"
          style={{ width: '100%', borderRadius: '0px' }}
          defaultValue={cellData.key.endDate}
          onChange={(e) => console.log(e.target.value)}
          min={new Date().toISOString().split('T')[0]}
        />
      </>)

  }
  return (
    <>
      <DataGrid
        id="DivRunTimeTable"
        dataSource={data}
        showBorders={true}
        rowAlternationEnabled={true}
        defaultSearchPanel={{ visible: true }}
        searchPanel={{ visible: true }}
        idField="id"
        rtlEnabled={true}
        disabled={loading}>
        <Column dataField="id" caption="ID" visible={false} width={50} />
        <Column dataField="paymentType" caption="نوع الدفع" />
        <Column dataField="year" caption="العام الدراسي" />
        <Column dataField="branchs" caption="الفروع" />
        <Column dataField="educationTypes" caption="نوع التعليم" />

        <Column
          dataField="percentage"
          caption="النسبة"
          cellRender={ChartCell}
        />
        <Column
          dataField="startDate"
          caption="تاريخ البدء"
          minWidth={320}
          cellRender={StartDateCell}
        />
        <Column
          dataField="endDate"
          caption="تاريخ الانتهاء"
          minWidth={320}
          cellRender={EndDateCell}
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