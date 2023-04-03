import React, { useState, useEffect } from "react";
import styles from "./styles/app_style";
function InputWithDropdown() {
  const [selectedOption, setSelectedOption] = useState("Option 1");
  const [showinput, setShowInput] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [loglimit, setLoglimits] = useState("");
  const [loglimitdaily, setLoglimitsdaily] = useState("");

  const [logformat, setLogformat] = useState("");
  const [subscriptiontype, setSubscriptiontype] = useState("");
  const [showlogs, setShowlogs] = useState(false);
  const [data, setData] = useState([]);

  const [filterValue, setFilterValue] = useState("");
  const [level, setLevel] = useState("");
  const [client, setClient] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [traceid, setTraceid] = useState("");
  const [indentifier, setIndentifier] = useState("");
  const [accesskey, setAccesskey] = useState("");
  const [logs, setLogs] = useState([]);

  const LogLevels = ["Error", "Info", "Warning"];
  //   const dataget = [
  //     {
  //       Type: "error",
  //       data: "data log data",
  //       date: "Date",
  //       TraceId: "T1",
  //       Identifier: "Id",
  //     },
  //     {
  //       Type: "warning",
  //       data: "data log data",
  //       date: "Date",
  //       TraceId: "",
  //       Identifier: "",
  //     },
  //     {
  //       Type: "info",
  //       data: "data log data",
  //       date: "Date",
  //       TraceId: "",
  //       Identifier: "",
  //     },
  //   ];
  //   const filteredData = dataget.filter(
  //     (item) =>
  //       item.Type.toLowerCase().includes(filterValue.toLowerCase()) ||
  //       item.data.toLowerCase().includes(filterValue.toLowerCase()) ||
  //       item.date.toLowerCase().includes(filterValue.toLowerCase()) ||
  //       item.TraceId.toLowerCase().includes(filterValue.toLowerCase()) ||
  //       item.Identifier.toLowerCase().includes(filterValue.toLowerCase())
  //   );
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedOption === "Option 1") {
      setShowInput(true);
    } else if (selectedOption === "Option 2") {
      // handleGetRequest();

      setShowlogs(true);
    }
    // setShowsecondpage(true);
  };
  function handleLevelChange(event) {
    setLevel(event.target.value);
  }

  function handleMessageChange(event) {
    setClient(event.target.value);
  }

  function handleStartDateChange(event) {
    setStartDate(event.target.value);
  }
  function handleAccessChange(event) {
    setAccesskey(event.target.value);
  }

  function handleEndDateChange(event) {
    setEndDate(event.target.value);
  }
  function handleTraceChange(event) {
    setTraceid(event.target.value);
  }
  function handleIndetifierChange(event) {
    setIndentifier(event.target.value);
  }

  const addToQuryParams = (params, field, key) => {
    if (field) {
      params[key] = field;
    }
    return params;
  };
  const handleGetRequest = (e) => {
    e.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("accessKey", accesskey);
    var raw = "";
    var requestOptions = {
      headers: {
        "Content-Type": "application/json",
        accessKey: accesskey,
      },
    };

    let queryParamData = {};
    queryParamData = addToQuryParams(queryParamData, indentifier, "Identifier");
    queryParamData = addToQuryParams(queryParamData, startDate, "startDate");
    queryParamData = addToQuryParams(queryParamData, client, "clientId");
    queryParamData = addToQuryParams(queryParamData, endDate, "EndDate");
    queryParamData = addToQuryParams(queryParamData, traceid, "TraceId");
    queryParamData = addToQuryParams(queryParamData, level, "level");
    const queryParams = new URLSearchParams(queryParamData);

    const url = `http://localhost:3000/logger/download?${queryParams}`;

    console.log(queryParamData, requestOptions);
    console.log(`url....${url}`);
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setLogs(result);
      })
      .catch((error) => window.alert(error));
  };

  const handleformSubmit = (event) => {
    event.preventDefault();
    window.alert("Hello world");
    const data = {
      organizationId: id,
      name: name,
      subscriptionType: subscriptiontype,
      logLimits: {
        Monthly: loglimit,
        Daily: loglimitdaily,
      },
      logFormats: logformat,
    };
    console.log(data);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify(data);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch("http://localhost:3000/client/", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        backgroundImage:
          "url('https://img.freepik.com/free-vector/abstract-realistic-technology-particle-background_23-2148429738.jpg?w=2000&t=st=1680464807~exp=1680465407~hmac=ff30086546d458223cf6f0d13a59b3f8442cabe5e72af76291879121ff3e1a77')",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",

          width: "50%",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "50px",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        {!showinput && !showlogs && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "15px",
              alignItems: "center",
              width: "100%",
            }}
          >
            <label
              htmlFor="dropdown"
              style={{
                display: "flex",
                width: "50%",
                color: "white",
                justifyContent: "center",
              }}
            >
              <p style={styles.headerText}>Select an option:</p>
            </label>
            <select
              style={styles.dropdownContainer}
              id="dropdown"
              value={selectedOption}
              onChange={handleOptionChange}
            >
              <option value="Option 1">
                {" "}
                <p style={styles.dropdownButton}> Create Client</p>{" "}
              </option>
              <option value="Option 2">View Logs</option>
            </select>
          </div>
        )}

        {showinput && (
          <div style={{ width: "80%" }}>
            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label
                  style={{
                    display: "flex",
                    color: "white",
                    fontSize: "18px",
                    width: "100%",
                  }}
                  htmlFor="client"
                >
                  Organization Id:
                </label>
                <input
                  id="client"
                  type="text"
                  style={{ height: "40px" }}
                  placeholder="Id"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label
                  style={{ display: "flex", color: "white", fontSize: "18px" }}
                  htmlFor="startDate"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  style={{ height: "40px" }}
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label
                  htmlFor="dropdown"
                  style={{ display: "flex", color: "white", fontSize: "18px" }}
                >
                  Subscription Type
                </label>
                <select
                  type="text"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    height: "50px",
                  }}
                  id="subscriptiontype"
                  value={subscriptiontype}
                  onChange={(e) => setSubscriptiontype(e.target.value)}
                >
                  <option value="Yearly">
                    {" "}
                    <p style={{ fontSize: "580px" }}> Yearly</p>{" "}
                  </option>
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                </select>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label
                  style={{
                    display: "flex",
                    color: "white",
                    fontSize: "18px",
                    width: "100%",
                  }}
                  htmlFor="client"
                >
                  Log Limits Monthly
                </label>
                <input
                  id="client"
                  type="text"
                  style={{ height: "40px" }}
                  placeholder="Monthly"
                  value={loglimit}
                  onChange={(e) => setLoglimits(e.target.value)}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label
                  style={{
                    display: "flex",
                    color: "white",
                    fontSize: "18px",
                    width: "100%",
                  }}
                  htmlFor="client"
                >
                  Log Limits Daily
                </label>
                <input
                  id="client"
                  type="text"
                  style={{ height: "40px" }}
                  placeholder="Daily"
                  value={loglimitdaily}
                  onChange={(e) => setLoglimitsdaily(e.target.value)}
                />
                <label
                  htmlFor="dropdown"
                  style={{ display: "flex", color: "white", fontSize: "18px" }}
                >
                  Log Formats
                </label>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label style={{ color: "white", fontSize: "22px" }}>
                    <input
                      type="checkbox"
                      value="JSON"
                      checked={logformat.includes("JSON")}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setLogformat([...logformat, e.target.value]);
                        } else {
                          setLogformat(
                            logformat.filter(
                              (option) => option !== e.target.value
                            )
                          );
                        }
                      }}
                    />
                    JSON
                  </label>
                  <label style={{ color: "white", fontSize: "22px" }}>
                    <input
                      type="checkbox"
                      value="TEXT"
                      checked={logformat.includes("TEXT")}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setLogformat([...logformat, e.target.value]);
                        } else {
                          setLogformat(
                            logformat.filter(
                              (option) => option !== e.target.value
                            )
                          );
                        }
                      }}
                    />
                    TEXT
                  </label>
                  <label style={{ color: "white", fontSize: "22px" }}>
                    <input
                      type="checkbox"
                      value=" XML"
                      checked={logformat.includes(" XML")}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setLogformat([...logformat, e.target.value]);
                        } else {
                          setLogformat(
                            logformat.filter(
                              (option) => option !== e.target.value
                            )
                          );
                        }
                      }}
                    />
                    XML
                  </label>
                  <label style={{ color: "white", fontSize: "22px" }}>
                    <input
                      type="checkbox"
                      value="File "
                      checked={logformat.includes("File ")}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setLogformat([...logformat, e.target.value]);
                        } else {
                          setLogformat(
                            logformat.filter(
                              (option) => option !== e.target.value
                            )
                          );
                        }
                      }}
                    />
                    File
                  </label>
                </div>
              </div>

              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {" "}
                <button
                  style={styles.dropdownButton}
                  type="submit"
                  onClick={(e) => {
                    window.alert("Hello");
                    handleformSubmit(e);
                  }}
                >
                  Create Cliente
                </button>
              </div>
            </form>
          </div>
        )}
        {showlogs && (
          <div>
            <form onSubmit={handleSubmit}>
              <div style={styles.inputContainer}>
                <label style={styles.labelText}>Type : </label>

                <select
                  style={styles.inputBox}
                  id="dropdown"
                  value={level}
                  onChange={handleLevelChange}
                >
                  {LogLevels.map((level) => (
                    <option value={level}>{level}</option>
                  ))}
                </select>
              </div>
              <div style={styles.inputContainer}>
                <label style={styles.labelText}>Access Key : </label>
                <input
                  style={styles.inputBox}
                  type="text"
                  value={accesskey}
                  onChange={handleAccessChange}
                />
              </div>
              <div style={styles.inputContainer}>
                <label style={styles.labelText}>Client : </label>
                <input
                  style={styles.inputBox}
                  type="text"
                  value={client}
                  onChange={handleMessageChange}
                />
              </div>

              <div style={styles.inputContainer}>
                <label style={styles.labelText}>Trace Id : </label>
                <input
                  style={styles.inputBox}
                  type="text"
                  value={traceid}
                  onChange={handleTraceChange}
                />
              </div>

              <div style={styles.inputContainer}>
                <label style={styles.labelText}>Indentifier : </label>
                <input
                  style={styles.inputBox}
                  type="text"
                  value={indentifier}
                  onChange={handleIndetifierChange}
                />
              </div>

              <div style={styles.inputContainer}>
                <label style={styles.labelText}>Start Date : </label>
                <input
                  style={styles.inputBox}
                  type="date"
                  value={startDate}
                  onChange={handleStartDateChange}
                />
              </div>

              <div style={styles.inputContainer}>
                <label style={styles.labelText}>End Date : </label>
                <input
                  style={styles.inputBox}
                  type="date"
                  value={endDate}
                  onChange={handleEndDateChange}
                />
              </div>
              <button style={styles.filterButton} onClick={handleGetRequest}>
                Filter Logs
              </button>
            </form>
            <div style={{ height: "300px", overflow: "scroll" }}>
              <table style={{ border: "1px solid white" }}>
                <thead style={{ gap: "10px" }}>
                  <tr style={{ border: "1px solid white" }}>
                    <th style={styles.columnHeader}>Trace ID</th>
                    <th style={styles.columnHeader}>Level</th>
                    <th style={styles.columnHeader}>data</th>
                    <th style={styles.columnHeader}>Date</th>
                    <th style={styles.columnHeader}>Identifier</th>
                  </tr>
                </thead>
                <tbody style={{ border: "1px solid white" }}>
                  {logs.map((item, index) => (
                    <tr key={index} style={{ border: "1px solid white" }}>
                      {item.Type === "Error" && (
                        <>
                          <td
                            style={{
                              border: "1px solid white",
                              backgroundColor: "red",
                            }}
                          >
                            <p style={styles.tableRow}> {item.TraceId}</p>
                          </td>
                          <td
                            style={{
                              border: "1px solid white",
                              backgroundColor: "red",
                            }}
                          >
                            <p style={styles.tableRow}>{item.Type}</p>
                          </td>
                          <td
                            style={{
                              border: "1px solid white",
                              backgroundColor: "red",
                            }}
                          >
                            <p style={styles.tableRow}>{item.data}</p>
                          </td>
                          <td
                            style={{
                              border: "1px solid white",
                              backgroundColor: "red",
                            }}
                          >
                            <p style={styles.tableRow}> {item.date}</p>
                          </td>
                          <td
                            style={{
                              border: "1px solid white",
                              backgroundColor: "red",
                            }}
                          >
                            <p style={styles.tableRow}> {item.Identifier}</p>
                          </td>
                        </>
                      )}
                      {item.Type === "Warning" && (
                        <>
                          <td
                            style={{
                              border: "1px solid white",
                              backgroundColor: "yellow",
                            }}
                          >
                            <p style={styles.tableRow}> {item.TraceId}</p>
                          </td>
                          <td
                            style={{
                              border: "1px solid white",
                              backgroundColor: "yellow",
                            }}
                          >
                            <p style={styles.tableRow}> {item.Type}</p>
                          </td>
                          <td
                            style={{
                              border: "1px solid white",
                              backgroundColor: "yellow",
                            }}
                          >
                            <p style={styles.tableRow}> {item.data}</p>
                          </td>
                          <td
                            style={{
                              border: "1px solid white",
                              backgroundColor: "yellow",
                            }}
                          >
                            <p style={styles.tableRow}>{item.date}</p>
                          </td>
                          <td
                            style={{
                              border: "1px solid white",
                              backgroundColor: "yellow",
                            }}
                          >
                            <p style={styles.tableRow}>{item.Identifier}</p>
                          </td>
                        </>
                      )}
                      {item.Type === "Info" && (
                        <>
                          <td
                            style={{
                              border: "1px solid white",
                              backgroundColor: "green",
                            }}
                          >
                            <p style={styles.tableRow}>{item.TraceId}</p>
                          </td>
                          <td
                            style={{
                              border: "1px solid white",
                              backgroundColor: "green",
                            }}
                          >
                            <p style={styles.tableRow}>{item.Type}</p>
                          </td>
                          <td
                            style={{
                              border: "1px solid white",
                              backgroundColor: "green",
                            }}
                          >
                            <p style={styles.tableRow}> {item.data}</p>
                          </td>
                          <td
                            style={{
                              border: "1px solid white",
                              backgroundColor: "green",
                            }}
                          >
                            <p style={styles.tableRow}> {item.date}</p>
                          </td>
                          <td
                            style={{
                              border: "1px solid white",
                              backgroundColor: "green",
                            }}
                          >
                            <p style={styles.tableRow}> {item.Identifier}</p>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {!showinput && (
          <button type="submit" style={styles.buttonContainer}>
            Submit
          </button>
        )}
      </form>
    </div>
  );
}

export default InputWithDropdown;
