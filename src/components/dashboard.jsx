import MainNav from "./mainNav";

function Dashboard() {
  return (
    <>
      <h1>
        Dataset name: Pilot top-down CO2 Budget constrained by the v10 OCO-2 MIP
        Version 1.0
      </h1>

      <select
        name="country"
        id="country"
        value={country}
        onChange={(event) => setCountry(event.target.value)}
      >
        <option value="ALL">ALL</option>
        {countries.map((code, index) => {
          return (
            <option value={code} key={index}>
              {code}
            </option>
          );
        })}
      </select>
      <br />
      <select
        name="experiment"
        id="experiment"
        value={experiment}
        onChange={(event) => setExperiment(event.target.value)}
      >
        <option value="ALL">ALL</option>
        <option value="IS">IS</option>
        <option value="LNLG">LNLG</option>
        <option value="LNLGIS">LNLGIS</option>
        <option value="LNLGOGIS">LNLGOGIS</option>
      </select>
      <div>
        <h2>Raw Data</h2>
        {data.length > 0 && (
          <table>
            <thead>
              <tr>
                {Object.keys(data[0]).map((key, index) => {
                  if (experiment === "ALL") {
                    return <th key={index}>{key}</th>;
                  } else {
                    const words = key.split(/\s+/);
                    if (
                      words.includes(experiment) ||
                      key === "Alpha 3 Code" ||
                      key === "Year"
                    ) {
                      return <th key={index}>{key}</th>;
                    }
                  }
                })}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {Object.entries(row).map(([property, value], colIndex) => {
                    if (experiment === "ALL") {
                      return <td key={colIndex}>{value}</td>;
                    } else {
                      const words = property.split(/\s+/); // Split property into words
                      if (
                        words.includes(experiment) ||
                        property === "Alpha 3 Code" ||
                        property === "Year"
                      ) {
                        return <td key={colIndex}>{value}</td>; // Return the column if the condition matches
                      }
                      return null; // Skip columns that don't match
                    }
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div>
        {country === "ALL" ? (
          <h2>Please select a country to display charts</h2>
        ) : (
          <div>
            <Bar options={barOptions} data={barData} />
            <Line options={LineOptions} data={Linedata} />
          </div>
        )}
      </div>
    </>
  );
}

export default Dashboard;
