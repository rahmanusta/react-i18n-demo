import React, {Component} from "react";
import "../node_modules/foundation-sites/dist/css/foundation.css";
import "./App.css";

import {addLocaleData, FormattedDate, FormattedMessage, FormattedNumber, FormattedTime, IntlProvider} from "react-intl";

import tr from "react-intl/locale-data/tr";
import en from "react-intl/locale-data/en";
import ja from "react-intl/locale-data/ja";

// Register locales
addLocaleData([...tr, ...en, ...ja]);

// Locale messages
let langConfig = {
    tr: {
        "app.hello": "Merhaba {name}"
    },
    en: {
        "app.hello": "Hello {name}"
    },
    ja: {
        "app.hello": "こんにちは {name}"
    }
};

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentLocale: "tr",
            currentMessages: langConfig["tr"]
        }
    }

    changeLocale(language) {
        this.setState({
            currentLocale: language,
            currentMessages: langConfig[language]
        });
    }

    render() {
        let {currentLocale, currentMessages} = this.state;
        return (
            <IntlProvider locale={currentLocale} messages={currentMessages}>
                <div>
                    <div className="row">
                        <div className="columns large-8 large-centered">
                            <select
                                value={currentLocale}
                                onChange={(e) => this.changeLocale(e.target.value)}>
                                {
                                    Object
                                        .keys(langConfig)
                                        .map(e => <option key={e} label={e} value={e}/>)
                                }
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="columns large-8 large-centered">
                            <table>
                                <thead>
                                <tr>
                                    <th>Veri tipi</th>
                                    <th>Çıktı</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>
                                        Date
                                    </td>
                                    <td>
                                        <FormattedDate value={new Date()}></FormattedDate>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Time
                                    </td>
                                    <td>
                                        <FormattedTime value={new Date()}></FormattedTime>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Currency
                                    </td>
                                    <td>
                                        <FormattedNumber value={1000} style="currency" currency="TRY"></FormattedNumber>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Translation
                                    </td>
                                    <td>
                                        <FormattedMessage id="app.hello" values={{name: "Rahman"}}/>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </IntlProvider>
        );
    }
}

export default App;
