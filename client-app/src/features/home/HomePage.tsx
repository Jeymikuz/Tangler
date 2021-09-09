import React from "react";
import { observer } from "mobx-react-lite";
import { Grid, Header, Icon } from "semantic-ui-react";

export default observer(function HomePage() {
    return (
        <>
            <Grid padded>
                <Grid.Row style={{ paddingTop: 200, paddingBottom: 200 }} columns={2}>
                    <Grid.Column>
                        <Header size='huge' content='
                        Jedno miejsce do integracji Twojego e-commerce' />
                    </Grid.Column>
                    <Grid.Column>
                        Tutaj bedzię grafika
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row style={{ padding: 30 }} columns={1}>
                    <Grid.Column>
                        Ponad 400 intergracji do wykorzystania w Twojej firmie
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row style={{ paddingTop: 50 }} columns={1}>
                    <Grid.Column>
                        <Header size='huge'>Jeden system <Icon name='exchange' /> Wiele Korzyści</Header>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row style={{ paddingTop: 30 }} columns={3} divided>
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
