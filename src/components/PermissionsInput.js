import React, { useState } from "react";
import PropTypes from "prop-types";
import { Input, Label, Icon } from "semantic-ui-react";

export default function PermissionInput(props) {
  const [newPermission, setNewPermission] = useState("");

  const onChange = updateFn => e => updateFn(e.target.value);

  const onClickAdd = e => {
    e.preventDefault();
    props.onChange &&
      props.onChange({ target: { value: [...props.value, newPermission] } });
    setNewPermission("");
  };

  const onClickDelete = i => e => {
    e.preventDefault();
    props.onChange &&
      props.onChange({
        target: {
          value: props.value.filter(
            (_, permissionIndex) => permissionIndex !== i
          )
        }
      });
  };

  return (
    <div>
      <Label.Group size="large">
        {props.value.map((permission, i) => (
          <Label key={i}>
            {permission}
            <Icon onClick={onClickDelete(i)} name="delete" />
          </Label>
        ))}
      </Label.Group>

      <Input
        type="text"
        label="Permission"
        value={newPermission}
        onChange={onChange(setNewPermission)}
        action={{
          children: "Add",
          onClick: onClickAdd
        }}
      />
    </div>
  );
}

PermissionInput.propTypes = {
  value: PropTypes.arrayOf(PropTypes.string)
};
