/**
 * Copyright (c) 2023, WSO2 LLC. (http://www.wso2.com).
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { BasicUserInfo, useAuthContext } from "@asgardeo/auth-react";
import React, { FunctionComponent, ReactElement, useState } from "react";
import { Button } from "@mui/material";
import { getHelloFromService } from "../api/hello";

/**
 * Decoded ID Token Response component Prop types interface.
 */
interface MainViewPropsInterface {
    /**
     * Derived Authenticated Response.
     */
    derivedResponse?: any;
}

export interface DerivedMainViewPropsInterface {
    /**
     * Response from the `getBasicUserInfo()` function from the SDK context.
     */
    authenticateResponse: BasicUserInfo;
    /**
     * ID token split by `.`.
     */
    idToken: string[];
    /**
     * Decoded Header of the ID Token.
     */
    decodedIdTokenHeader: Record<string, unknown>;
    /**
     * Decoded Payload of the ID Token.
     */
    decodedIDTokenPayload: Record<string, unknown>;
}

/**
 * Displays the derived Authentication Response from the SDK.
 *
 * @param {MainViewPropsInterface} props - Props injected to the component.
 *
 * @return {React.ReactElement}
 */
export const MainView: FunctionComponent<MainViewPropsInterface> = (
    props: MainViewPropsInterface
): ReactElement => {

    const {
        derivedResponse
    } = props;

    const[showHello, setShowHello] = useState<boolean>(false);
    const[helloMessage, setHelloMessage] = useState<string>("");
    const { getAccessToken } = useAuthContext();

    const serviceURL = window.config.serviceURL;

    const handleSayHello = () => {
        
        async function getHelloMessage() {
            const accessToken = await getAccessToken();
            const response = await getHelloFromService(serviceURL, accessToken);
            setHelloMessage(response.data.message);
        }
        getHelloMessage();
        setShowHello(true);
    };

    return (
        <div>
            <div>
                <Button variant="contained" sx={{marginTop: '30px', marginBottom: '30px', width: "200px"}} onClick={handleSayHello}>Say Hello!</Button>
            </div>
            {showHello &&  <div>{helloMessage}</div>}
        </div>
    );
};
