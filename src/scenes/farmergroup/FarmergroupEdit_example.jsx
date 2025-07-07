import React from "react";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";

const initialFriends = [
  {
    name: "Friend_A",
    email: "email_A@somewhere.com"
  },
  {
    name: "Friend_B",
    email: "email_B@somewhere.com"
  },
  {
    name: "Friend_C",
    email: "email_C@somewhere.com"
  }
];

const initialValues = { friends: initialFriends };

function partition(array, filter) {
  let pass = [],
    fail = [];
  array.forEach(e => (filter(e) ? pass : fail).push(e));
  return [pass, fail];
}

const addDeleteChange = (in1, out1) => {
  let inMap = new Map(in1.map(f => [f.name, f]));
  let outMap = new Map(out1.map(f => [f.name, f]));
  let inNames = new Set(inMap.keys());
  let outNames = new Set(outMap.keys());
  let [kept, added] = partition(out1, f => inNames.has(f.name));
  let deleted = in1.filter(f => !outNames.has(f.name));
  //alert(JSON.stringify(Object.fromEntries(deleted.entries())));
  let changed = kept.filter(f => f.email !== inMap.get(f.name).email);
  //alert(JSON.stringify(Object.fromEntries(changed.entries())));
  return { added: added, deleted: deleted, changed: changed };
};

const mySubmit = values => console.log();

const SignIn = () => (
  <div>
    <h1>Invite friends</h1>
    <Formik
      initialValues={initialValues}
      onSubmit={values => {
        const { added, deleted, changed } = addDeleteChange(
          initialFriends,
          values.friends
        );
        // var itemRemoved = values.GetItemRemoveFromArray; // This is what I'm looking for
        // console.log(itemRemoved);
        // // Would print Friend_A

        // var itemAdded = values.GetItemAddedFromArray; // This is what I'm looking for
        // console.log(itemAdded);
        // // Would print New_Friend

        // var itemUpdated = values.GetItemUpdatedInArray; // This is what I'm looking for
        // console.log(itemUpdated);
        // // Would print Friend_C

        setTimeout(() => {
          alert(
            "Added: " + JSON.stringify(Object.fromEntries(added.entries()))
          );
          alert(
            "Deleted: " + JSON.stringify(Object.fromEntries(deleted.entries()))
          );
          alert(
            "Changed:" + JSON.stringify(Object.fromEntries(changed.entries()))
          );
          alert(JSON.stringify(values, null, 2));
        }, 500);
      }}
      render={({ values }) => (
        <Form>
          <FieldArray
            name="friends"
            render={({ insert, remove, push }) => (
              <div>
                {values.friends.length > 0 &&
                  values.friends.map((friend, index) => (
                    <div className="row" key={index}>
                      <div className="col">
                        <label htmlFor={`friends.${index}.name`}>Name</label>
                        <Field
                          name={`friends.${index}.name`}
                          placeholder="Jane Doe"
                          type="text"
                        />
                        <ErrorMessage
                          name={`friends.${index}.name`}
                          component="div"
                          className="field-error"
                        />
                      </div>
                      <div className="col">
                        <label htmlFor={`friends.${index}.email`}>Email</label>
                        <Field
                          name={`friends.${index}.email`}
                          placeholder="jane@acme.com"
                          type="email"
                        />
                        <ErrorMessage
                          name={`friends.${index}.name`}
                          component="div"
                          className="field-error"
                        />
                      </div>
                      <div className="col">
                        <button
                          type="button"
                          className="secondary"
                          onClick={() => remove(index)}
                        >
                          X
                        </button>
                      </div>
                    </div>
                  ))}
                <button
                  type="button"
                  className="secondary"
                  onClick={() => push({ name: "", email: "" })}
                >
                  Add Friend
                </button>
              </div>
            )}
          />
          <button type="submit">Invite</button>
        </Form>
      )}
    />
  </div>
);

export default SignIn;
