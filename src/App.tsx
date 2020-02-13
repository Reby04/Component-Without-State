import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import "antd/dist/antd.css";
import { Button, Modal } from "antd";
import { FormApp } from "./FormApp";

//Query per prendere i dati dal database
const GET_PERIOD = gql`
  query period {
    periodTypes(scopeGroupId: 20124) {
      items {
        id
        displayName
        groupId
        name
        code
        title
        description
        flat
        threshold
        flexible
        position
        reportOverride
        workflowStatus
      }
    }
  }
`;

//Query per rimuovere i dati dal database
const REMOVE_PERIOD = gql`
  mutation($siteGroupId: Long!, $periodTypeIds: String!) {
    deletePeriodType(siteGroupId: $siteGroupId, periodTypeIds: $periodTypeIds)
  }
`;
//Query per aggiungere dati al Database
const ADD_PERIOD = gql`
  mutation($periodType: InputPeriodType!) {
    createPeriodType(periodType: $periodType) {
      id
      displayName
    }
  }
`;

const EDIT_PERIOD = gql`
  mutation($periodTypeId: Long!, $periodType: InputPeriodType!) {
    updatePeriodType(periodTypeId: $periodTypeId, periodType: $periodType) {
      id
    }
  }
`;
// type modal = {
//   ModalText: string;
//   visible: boolean;
//   confirmLoading: boolean;
// };
interface Props {
  // modal: modal;
}

const App: React.FC<Props> = () => {
  const [dataForm, setDataForm] = useState({
    groupId: 20128,
    id: 0,
    name: "",
    code: "",
    title: "",
    description: "",
    flat: false,
    threshold: false,
    flexible: false,
    position: 0,
    reportOverride: false,
    workflowStatus: 0
  });

  const [modal, setModal] = useState({
    ModalText: "Content of the modal",
    visible: false,
    confirmLoading: false
  });

  const { loading, error, data } = useQuery(GET_PERIOD, {
    //Quando si aggiunge o si elimina un elemento il fetchPolicy serve ad aggiornare automaticamente la pagina
    fetchPolicy: "cache-and-network"
  });
  console.log(data);

  const [removePeriod] = useMutation(REMOVE_PERIOD, {
    refetchQueries: ["period"]
  });

  const [addTodo] = useMutation(ADD_PERIOD, {
    refetchQueries: ["period"]
  });

  const [editPeriod] = useMutation(EDIT_PERIOD, { refetchQueries: ["period"] });

  const showModal = () => {
    setModal({
      ModalText: "Content of the modal",
      visible: true,
      confirmLoading: false
    });
  };

  const handleFormChange = (name: string, value: any) => {
    setDataForm({
      ...dataForm,
      [name]: value
    });
  };

  const onChange = () => {
    console.log("STAMPO IL DATAFORM %O", dataForm);
    if (dataForm.id > 0) {
      editPeriod({
        variables: {
          periodTypeId: dataForm.id,
          periodType: {
            groupId: dataForm.groupId,
            id: dataForm.id,
            name: dataForm.name,
            code: dataForm.code,
            title: JSON.stringify({ en_US: dataForm.title }),
            description: JSON.stringify({ en_US: dataForm.description }),
            flat: dataForm.flat,
            threshold: dataForm.threshold,
            flexible: dataForm.flexible,
            position: dataForm.position,
            reportOverride: dataForm.reportOverride,
            workflowStatus: dataForm.workflowStatus
          }
        }
      });
    } else {
      addTodo({
        variables: {
          periodType: {
            groupId: 20128,
            name: dataForm.name,
            code: dataForm.code,
            title: JSON.stringify({ en_US: dataForm.title }),
            description: JSON.stringify({ en_US: dataForm.description }),
            flat: dataForm.flat,
            threshold: dataForm.threshold,
            flexible: dataForm.flexible,
            position: 0,
            reportOverride: false,
            workflowStatus: 0
          }
        }
      });
    }

    setModal({
      ModalText: "Content of the modal",
      visible: false,
      confirmLoading: false
    });
  };

  if (loading) return <p>Loading ...</p>;

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <h3>
          Hello
          <ul>
            {data.periodTypes.items.map((value: any) => (
              <li key={value.id}>
                {value.displayName}
                <Button
                  onClick={(e: any) => {
                    removePeriod({
                      variables: {
                        siteGroupId: 20128,
                        periodTypeIds: value.id
                      }
                    });
                  }}
                >
                  Remove
                </Button>
                <Button
                  // onClick={showModal}
                  onClick={(e: any) => {
                    console.log("Ho cliccato Edit %o", value);
                    setDataForm({
                      groupId: value.groupId,
                      id: value.id,
                      name: value.name,
                      code: value.code,
                      title: JSON.parse(value.title).en_US,
                      description: JSON.parse(value.description).en_US,
                      flat: value.flat,
                      threshold: value.threshold,
                      flexible: value.flexible,
                      position: value.position,
                      reportOverride: value.reportOverride,
                      workflowStatus: value.workflowStatus
                    });
                    showModal();
                  }}
                >
                  Edit
                </Button>
              </li>
            ))}
          </ul>
          <Modal
            title="Title"
            visible={modal.visible}
            onOk={onChange}
            //confirmLoading={confirmLoading}
            // onCancel={handleCancel}
          >
            <FormApp
              onSubmit={onChange}
              handleFormChange={handleFormChange}
              // name={dataForm.name}
              // code={dataForm.code}
              // title={dataForm.title}
              // description={dataForm.description}
              // flat={dataForm.flat}
              // threshold={dataForm.threshold}
              // flexible={dataForm.flexible}

              // position={dataForm.position}
              // reportOverride={dataForm.reportOverride}
              // workflowStatus={dataForm.workflowStatus}
              {...dataForm}
            ></FormApp>
          </Modal>
          {/* <FormApp
            onSubmit={onChange}
            dataForm={dataForm}
            setDataForm={setDataForm}
          ></FormApp> */}
        </h3>

        {/* <Button
          type="primary"
          onClick={(e: any) => {
            onChange();
          }}
        >
          Aggiungi
        </Button> */}

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
