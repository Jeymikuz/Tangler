import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { ErrorMessage, Formik } from "formik";
import { Button, Form, Grid, Header, Image, Label } from "semantic-ui-react";
import FTextInput from "../../app/common/form/FTextInput";

export default observer(function HomePage() {

    const { userStore } = useStore();

    return (
        <>
            <Grid >
                <Grid.Row columns={2}> 
                <Grid.Column>
                    <Header size='huge' content='
                        Jedno miejsce do integracji Twojego e-commerce' />                        
                </Grid.Column>
                <Grid.Column>
                    Tutaj bedzię grafika
                </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={1}>
                    <Grid.Column>
                        Ponad 400 intergracji do wykorzystania w Twojej firmie
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={1}>
                    <Grid.Column>
                        <Header size='huge' content='Jeden system. Wiele Korzyści' />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={3} divided>
                    <Grid.Column>
                        <h4>Intergracje, których potrzebujesz</h4>
                        <p>Wybierz z bogatej oferty integracji te, które są potrzebne dla Twojego biznesu. W ramach jednego systemu i abonamentu masz dostęp do popularnych platform marketplace, sklepów, kurierów i systemów księgowych.</p>
                    </Grid.Column>
                    <Grid.Column>
                        <h4>Zarządzanie z jednego miejsca</h4>
                        <p>Nie musisz logować się do każdego serwisu z osobna. Zarządzaj zamówieniami z wielu źródeł w jednym systemie, z którego wystawisz także faktury, wydrukujesz etykiety i nadasz paczki.</p>
                    </Grid.Column>
                    <Grid.Column>
                        <h4>Pełna kontrola stanów i cen</h4>
                        <p>Synchronizacja magazynu z kanałami sprzedaży pozwoli Ci zapomnieć o rozbieżnościach ilościowych i cenowych oraz automatycznie zamykać oferty przy zerowym stanie magazynowym.</p>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </>
    )
})
