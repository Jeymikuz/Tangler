import React from "react";
import { observer } from "mobx-react-lite";
import { Grid, Header, Icon, Image } from "semantic-ui-react";

export default observer(function HomePage() {
    return (
        <>
            <Grid padded>
                <Grid.Row columns={2}>
                    <Grid.Column  >
                        <Header size='huge' style={{ marginTop: '40%' }}>
                            Totam numquam reprehenderit doloremque.
                        </Header>
                    </Grid.Column>
                    <Grid.Column>
                        <Image src='logo-tangler.png' size='large' />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row style={{ padding: 30 }} columns={1}>
                    <Grid.Column>
                        Minima tempore quia accusamus recusandae.
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row style={{ paddingTop: 50 }} columns={1}>
                    <Grid.Column style={{ textAlign: 'center' }} >
                        <Header size='huge'>Nostrum, repudiandae. <Icon name='exchange' /> Architecto, earum praesentium.</Header>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row style={{ paddingTop: 30 }} columns={3} divided>
                    <Grid.Column>
                        <h4>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</h4>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, repudiandae. Veritatis aperiam, pariatur, vitae facere quas rem, porro aspernatur provident harum repellendus at eveniet aliquid molestias voluptatum. Architecto, earum praesentium.</p>
                    </Grid.Column>
                    <Grid.Column>
                        <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h4>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere quis maxime harum illum id nobis deserunt beatae cum nemo unde eos, exercitationem, modi sint delectus aliquid minus, voluptate nisi distinctio?</p>
                    </Grid.Column>
                    <Grid.Column>
                        <h4>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</h4>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum quibusdam perferendis nisi facilis, qui sequi quas temporibus fuga, earum in architecto tempore numquam labore minus, vitae laboriosam. Sed, voluptates eos!</p>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </>
    )
})
