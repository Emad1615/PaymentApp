import DataGrid, { Column, Paging } from 'devextreme-react/data-grid';
import Input from './../ui/Input';
import { FaPercentage } from 'react-icons/fa';
import styled from 'styled-components';

const Per = styled.div`
  background: #eef1fe;
  padding: 10.3px 10px;
  color: #6c6c6c;
  border: 1px solid #cccccc;
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
  return (
    <>
      <DataGrid
        id="DivRunTimeTable"
        dataSource={data}
        showBorders={true}
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
        {/* <Column
          dataField="startDate"
          caption="تاريخ البدء"
          minWidth={320}
          cellRender={ChartCell}
        />
        <Column
          dataField="endDate"
          caption="تاريخ الانتهاء"
          minWidth={320}
          cellRender={ChartCell}
        /> */}
        <Paging defaultPageSize={10} />
      </DataGrid>
    </>
  );
}

export default RunTimeTable;
