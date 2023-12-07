import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Panel } from "primereact/panel";
import { useEffect, useState } from "react";

type listType = {
  value: string | number;
  index: number;
};

const DataTableSpo = ({ data }: { data: string[] }) => {
  const [list, setList] = useState<listType[]>([]);

  useEffect(() => {
    const test = data.map((elem, index) => {
      return {
        value: elem,
        index: index,
      };
    });
    setList(test);
  }, [data]);
  return (
    <Panel header="Данные" toggleable>
      <DataTable value={list} tableStyle={{ minWidth: "50rem" }}>
        <Column field="index" header="Индекс"></Column>
        <Column field="value" header="Значение"></Column>
      </DataTable>
    </Panel>
  );
};

export default DataTableSpo;
