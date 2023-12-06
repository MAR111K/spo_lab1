const DataTable = ({ data }: { data: string[] }) => {
  return (
    <div>
      <span>Исходные данные</span>
      <table style={{ width: "100%", border: "1px solid #000" }}>
        <tbody>
          {data.map((line, i) => (
            <tr key={i}>
              <td>{i}</td>
              <td>{line ?? "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
