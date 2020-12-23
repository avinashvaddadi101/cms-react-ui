import React from "react";
import axios from "axios";

class CMSDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      selectedId: 0,
    };
  }
  onlyOne = (checkbox) => {
    var checkboxes = document.getElementsByName("check");
    checkboxes.forEach((item) => {
      if (item !== checkbox.target) {
        item.checked = false;
      }
    });
  };
  onlyOne2 = (checkbox) => {
    var checkboxes = document.getElementsByName("check2");
    checkboxes.forEach((item) => {
      if (item !== checkbox.target) {
        item.checked = false;
      }
    });
  };

  editCustomer = (id) => {
    alert("edit customer called " + id);
    //selectedId = id;
    // name
    this.state.selectedId = id;
    let editId = document.getElementById(id).parentElement.nextSibling
      .nextSibling;
    let name = editId.getElementsByTagName("p")[0].innerHTML;
    alert(name);

    var nameDiv = document.createElement("div");
    nameDiv.classList.add("Cell");
    nameDiv.innerHTML =
      '<input type="text" id="idName' + id + '"  value="' + name + '">';
    editId.parentNode.replaceChild(nameDiv, editId);

    //date of birth
    let editDob = document.getElementById(id).parentElement.nextSibling
      .nextSibling.nextSibling;
    let dob = editDob.getElementsByTagName("p")[0].innerHTML;
    alert(dob);

    var dobDiv = document.createElement("div");
    dobDiv.classList.add("Cell");
    dobDiv.innerHTML =
      '<input type="text" id="iddob' + id + '"  value="' + dob + '">';
    editDob.parentNode.replaceChild(dobDiv, editDob);

    //address

    let editAddress = document.getElementById(id).parentElement.nextSibling
      .nextSibling.nextSibling.nextSibling;
    let address = editAddress.getElementsByTagName("p")[0].innerHTML;
    alert(address);

    var addressDiv = document.createElement("div");
    addressDiv.classList.add("Cell");
    addressDiv.innerHTML =
      '<input type="text" id="idaddress' + id + '"  value="' + address + '">';
    editAddress.parentNode.replaceChild(addressDiv, editAddress);
  };

  ModifyCustomer = () => {
    alert("called modify customer");
    let ele = document.getElementById("delete");
    let ele2 = document.getElementById("update");
    let ele3 = document.getElementById("create");

    if (ele.checked == true) {
      alert("delete checked");
      this.DeleteCustomer();
    } else if (ele2.checked == true) {
      alert("update checked");
      this.UpdateCustomer(this.state.selectedId);
    } else if (ele3.checked == true) {
      alert("create checked");
      this.CreateCustomer();
    }
  };

  DeleteCustomer = () => {
    alert("delete customer called");
    for (var i = 0; i < this.state.customers.length; i++) {
      var ele = document.getElementById(this.state.customers[i].id);
      if (ele.checked == true) {
        alert(ele.id);

        axios
          .delete("http://localhost:51478/api/values/" + ele.id)
          .then((res) => {
            alert("delete customer successful");
            this.GetCustomers();
            document.getElementById("delete").checked = false;
          });
      }
    }
  };
  rollbackedit = (id) => {
    alert(id);
    let var1 = document.getElementById("idName" + id);
    alert(var1.value);
    let parent = var1.parentElement;
    parent.innerHTML = "<p>" + var1.value + "</p>";
    var1.remove();

    let var2 = document.getElementById("iddob" + id);
    alert(var2.value);
    let parent2 = var2.parentElement;
    parent2.innerHTML = "<p>" + var2.value + "</p>";
    var2.remove();

    let var3 = document.getElementById("idaddress" + id);
    alert(var3.value);
    let parent3 = var3.parentElement;
    parent3.innerHTML = "<p>" + var3.value + "</p>";
    var3.remove();
  };
  UpdateCustomer = (id) => {
    alert("Update Customer called");
    var ele = document.getElementById(id);
    alert(id);
    var data = {};

    var inpname = document.getElementById("idName" + ele.id);
    data.Name = inpname.value;

    var inpdob = document.getElementById("iddob" + ele.id);
    data.Dob = inpdob.value;

    var inpAddress = document.getElementById("idaddress" + ele.id);
    data.Address = inpAddress.value;

    var json = JSON.stringify(data);

    const options = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "PUT",
      },
    };

    axios
      .put("http://localhost:51478/api/values/" + ele.id, json, options)
      .then((res) => {
        alert("update customer successful");
        this.GetCustomers();
        document.getElementById("update").checked = false;
        this.rollbackedit(ele.id);
      });
  };

  CreateCustomer = () => {
    alert("create customer called");

    var data = {};
    var inpname = document.getElementById("idName");
    data.Name = inpname.value;
    var inpdob = document.getElementById("idDob");
    data.Dob = inpdob.value;
    var inpAddress = document.getElementById("idAddress");
    data.Address = inpAddress.value;
    var json = JSON.stringify(data);

    const options = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "POST",
      },
    };

    axios
      .post("http://localhost:51478/api/values", json, options)
      .then((res) => {
        alert("create customer successful");
        this.GetCustomers();
        document.getElementById("idName").parentElement.parentElement.remove();
        document.getElementById("create").checked = false;
      });
  };

  myFunction = () => {
    alert("myfunction called");
    var eleTab = document.getElementById("rowCustomer");

    var newDiv = document.createElement("div");
    newDiv.classList.add("Row");

    var checkDiv = document.createElement("div");
    checkDiv.classList.add("Cell");
    checkDiv.innerHTML = "";

    var idDiv = document.createElement("div");
    idDiv.classList.add("Cell");
    idDiv.innerHTML = "";

    var nameDiv = document.createElement("div");
    nameDiv.classList.add("Cell");
    nameDiv.innerHTML = '<input type="text" id="idName" value="">';

    var dobDiv = document.createElement("div");
    dobDiv.classList.add("Cell");
    dobDiv.innerHTML = '<input type="text" id="idDob" value="">';

    var addressDiv = document.createElement("div");
    addressDiv.classList.add("Cell");
    addressDiv.innerHTML = '<input type="text" id="idAddress" value="">';

    newDiv.appendChild(checkDiv);
    newDiv.appendChild(idDiv);
    newDiv.appendChild(nameDiv);
    newDiv.appendChild(dobDiv);
    newDiv.appendChild(addressDiv);
    eleTab.appendChild(newDiv);
  };

  GetCustomers = () => {
    axios.get("http://localhost:51478/api/values").then((res) => {
      this.setState({ customers: res.data });
    });
  };

  componentDidMount() {
    this.GetCustomers();
  }
  render() {
    return (
      <div>
        <div className="title">
          <p className="information">Customer Information</p>
        </div>
        <div className="table">
          <div id="rowCustomer">
            <div className="Heading">
              <div className="Cell">
                <p></p>
              </div>
              <div className="Cell">
                <p id="ID">ID </p>
              </div>
              <div className="Cell">
                <p id="cname">Customer Name </p>
              </div>
              <div className="Cell">
                <p id="dob">Date Of Birth </p>
              </div>
              <div className="Cell">
                <p id="caddress">Address </p>
              </div>
              <div className="Cell">
                <p></p>
              </div>
            </div>

            {this.state.customers.map((cust) => {
              return (
                <div className="Row" key={cust.id}>
                  <div className="Cell">
                    <input
                      type="checkbox"
                      id={cust.id}
                      onClick={(event) => this.onlyOne2(event)}
                      name="check2"
                    ></input>
                  </div>
                  <div className="Cell">
                    <p>{cust.id}</p>
                  </div>
                  <div className="Cell">
                    <p>{cust.name}</p>
                  </div>
                  <div className="Cell">
                    <p>{cust.dob}</p>
                  </div>
                  <div className="Cell">
                    <p>{cust.address}</p>
                  </div>
                  <div className="Cell">
                    <a href="#" onClick={() => this.editCustomer(cust.id)}>
                      edit
                    </a>
                  </div>
                </div>
              );
            })}

            {/* <ul>
              {this.state.customers.map((cust) => {
                return <li key={cust.id}>{cust.name}</li>;
              })}
            </ul> */}
          </div>
        </div>
        <div>
          <input
            type="submit"
            onClick={this.myFunction}
            value="Create Customer"
            id="submit"
          ></input>
        </div>
        <div>
          <input
            type="checkbox"
            id="delete"
            name="check"
            onClick={this.onlyOne}
          ></input>
          <label for="delete"> Delete Customer</label>

          <div>
            <input
              type="checkbox"
              id="update"
              name="check"
              onClick={this.onlyOne}
            ></input>
            <label for="update"> Update Customer</label>
          </div>

          <div>
            <input
              type="checkbox"
              id="create"
              name="check"
              onClick={this.onlyOne}
            ></input>
            <label for="create"> Create Customer</label>
            <br></br>
          </div>

          <div>
            <input
              type="submit"
              id="submit2"
              value="Submit"
              onClick={this.ModifyCustomer}
            ></input>
          </div>
        </div>
      </div>
    );
  }
}

export default CMSDisplay;
