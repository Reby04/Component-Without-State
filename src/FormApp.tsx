import React, { useState } from "react";
import "./App.css";
import "antd/dist/antd.css";
import { Form, Radio, Button } from "antd";
import { Input } from "antd";
import validatejs from "validate.js";
interface Props {
  name: string;
  code: string;
  title: string;
  description: string;
  flat: boolean;
  threshold: boolean;
  flexible: boolean;
  position: number;
  reportOverride: boolean;
  workflowStatus: number;
  onSubmit: Function;
  handleFormChange: Function;
}
interface ErrorsState {
  [key: string]: any;
}
// var constraints = {
//   name: {
//     presence: true,
//     exclusion: {
//       within: ["nicklas"],
//       message: "'%{value}' is not allowed"
//     }
//   }
// };

export const FormApp: React.FC<Props> = ({
  name,
  code,
  title,
  description,
  flat,
  threshold,
  flexible,
  handleFormChange,
  onSubmit
}) => {
  const [validation, setValidation] = useState({
    name: {
      presence: true,
      length: {
        minimum: 6,
        message: "must be at least 6 characters"
      }
    },

    code: {
      presence: {
        message: "Prova messaggio"
      }
    },

    title: { presence: true },

    description: { presence: true }
  });

  const [errors, setErrors] = useState<ErrorsState>({
    // name: name,
    // code: code,
    // title: title,
    // description: description,
    // flat: flat,
    // flexible: flexible,
    // threshold: threshold
  });

  const validateForm = () => {
    setErrors(
      validatejs.validate(
        {
          name: name,
          code: code,
          title: title,
          description: description,
          flat: flat,
          flexible: flexible,
          threshold: threshold
        },
        validation
      )
    );
  };
  return (
    <Form>
      <Form.Item
        label="Name: "
        validateStatus={errors?.["name"] ? "error" : ""}
        help={errors?.["name"]}
      >
        <Input
          name="name"
          value={name}
          onChange={(event: any) => {
            validateForm();
            handleFormChange("name", event.target.value);
          }}
        ></Input>
      </Form.Item>

      <br></br>
      <Form.Item
        label="Code: "
        validateStatus={errors?.["code"] ? "error" : ""}
        help=""
      >
        <Input
          name="code"
          value={code}
          onChange={(event: any) => {
            validateForm();
            handleFormChange("code", event.target.value);
          }}
        ></Input>
      </Form.Item>

      <br></br>
      <Form.Item
        label="Title: "
        validateStatus={errors?.["title"] ? "error" : ""}
        help={errors?.["title"]}
      >
        <Input
          name="title"
          value={title}
          onChange={(event: any) => {
            validateForm();
            handleFormChange("title", event.target.value);
          }}
        ></Input>
      </Form.Item>

      <br></br>
      <Form.Item
        label="Description: "
        validateStatus={errors?.["description"] ? "error" : ""}
        help=""
      >
        <Input
          name="description"
          value={description}
          onChange={(event: any) => {
            validateForm();
            handleFormChange("description", event.target.value);
          }}
        ></Input>
      </Form.Item>

      <br></br>
      <Form.Item label="Flat: " validateStatus="" help="">
        <Radio
          value={flat}
          name="flat"
          defaultChecked={false}
          onChange={(event: any) => {
            handleFormChange("flat", event.target.checked);
          }}
        ></Radio>
      </Form.Item>

      <br></br>
      <Form.Item label="threshold: " validateStatus="" help="">
        <Radio
          name="threshold"
          defaultChecked={false}
          value={threshold}
          onChange={(event: any) => {
            handleFormChange("threshold", event.target.checked);
          }}
        ></Radio>
      </Form.Item>

      <br></br>
      <Form.Item label="threshold: " validateStatus="" help="">
        <Radio
          name="flexible"
          value={flexible}
          defaultChecked={false}
          onChange={(event: any) => {
            handleFormChange("flexible", event.target.checked);
          }}
        ></Radio>
      </Form.Item>

      <br></br>
      <br></br>
      <Button
        type="primary"
        // disabled={!Object.keys(errors).some(x => errors[x])}
        disabled={errors && Object.keys(errors).length > 0}
        onClick={(e: any) => {
          validateForm();
          onSubmit();
        }}
      >
        Aggiungi
      </Button>
    </Form>
  );
};
