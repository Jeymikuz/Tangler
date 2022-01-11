export interface Integration{
    id: string,
    type: IntegrationType,
    siteUrl: string,
    privateName: string,
    connectionProblem: boolean,
}

export interface NewIntegration{
    type: IntegrationType,
    siteUrl: string,
    privateName: string,
    client_key: string,
    private_key: string
}

export enum IntegrationType{
    Woocommerce = 0,
}