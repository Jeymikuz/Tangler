import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Button, Grid, Header, Label } from "semantic-ui-react";
import agent from "../../../app/api/agent";
import FTextInput from "../../../app/common/form/FTextInput";
import { Company } from "../../../app/models/company";
import { useStore } from "../../../app/stores/store";

export default observer(function SettingsInfoForm() {
  const {ordersStore} = useStore();
  const [company, setCompany] = useState<Company | undefined>(undefined);

  useEffect(() => {
    async function GetCompany() {
      var temp = await agent.Company.get();
      setCompany(temp);
    }

    GetCompany();
  },[]);

  return (
    <>
      {company && (
        <Formik initialValues={company} 
        onSubmit={(values, {setErrors, setSubmitting}) => {
            ordersStore.editCompanyInfo(values).then(()=> setSubmitting(false)).catch((errors) => setErrors(errors))
        }}>
          {({ handleSubmit, isSubmitting, errors }) => (
            <Form
              className="ui form"
              onSubmit={handleSubmit}
              autoComplete="off"
              style={{ padding: "2rem", marginBottom: "2rem" }}
            >
              <Grid columns={2}>
                <Grid.Column>
                  <Label content="Nazwa firmy" basic />
                  <FTextInput name="name" placeholder="Nazwa statusu" />
                  <Label content="Nip" basic />
                  <FTextInput name="nip" placeholder="Nazwa statusu" />
                </Grid.Column>
                <Grid.Column>
                  <Label content="Nazwa ulicy" basic />
                  <FTextInput name="address.street" placeholder="Ulica" />
                  <Grid columns={2}>
                    <Grid.Column>
                      <Label content="Kod pocztowy" basic />
                      <FTextInput
                        name="address.zipCode"
                        placeholder="Kod pocztowy"
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Label content="Miasto" basic />
                      <FTextInput
                        name="address.city"
                        placeholder="Miasto"
                      />
                    </Grid.Column>
                  </Grid>
                </Grid.Column>
              </Grid>
              <Button
              style={{marginTop: 20}}
                type='submit'
                icon='check'
                loading={isSubmitting}
                floated='right'
                color='green'
              />
            </Form>
          )}
        </Formik>
      )}
    </>
  );
});
