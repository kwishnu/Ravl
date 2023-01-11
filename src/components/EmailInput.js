import React, { useState } from "react";
import colors from '../config/colors';
import animStyles from '../styles/anim.module.css';
import PropTypes from "prop-types";

const EmailInput = ({updateEmailAdress, domains }) => {
    const [ email, setEmail ] = useState("");
    const [ suggestion, setSuggestion ] = useState([]);

    const getSuggestion = email => {
        let emailParts = email.split("@");
        if (emailParts.length <= 1) {
            return [];
        }

        const userDomain = [ ...emailParts ].pop();
        if (!userDomain.length) {
            return [];
        }

        const userName = [ ...emailParts ].shift();
        return domains
            .filter(domain => domain !== userDomain && domain.includes(userDomain))
            .map(domain => `${userName}@${domain}`);
    };

    const handleEmailChange = (event) => {
        const email = event.target.value;
        const suggestion = email && email.length > 3
            ? getSuggestion(email)
            : [];
        updateEmailAdress(email);
        setEmail(email);
        setSuggestion(suggestion);
    };

    const handleSuggestionClick = suggestedEmail => {
        setEmail(suggestedEmail);
        updateEmailAdress(suggestedEmail);
        setSuggestion([]);
    };

    return (
        <section style={input_styles.emailautocomplete}>
            <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                autoComplete="off"
            />
            <div style={input_styles.emailautocomplete_dropdown}>
                <ul className={animStyles.dropdown}>
                    {suggestion && suggestion.map((suggestedEmail, index) => (
                        <li
                            key={index}
                            className={animStyles.dropdown__item}
                            onClick={() => handleSuggestionClick(suggestedEmail)}
                        >
                            {suggestedEmail}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

EmailInput.defaultProps = {
    domains: [
        "gmail.com", "yahoo.com", "hotmail.com", "aol.com", "comcast.net",
        "msn.com", "facebook.com", "verizon.net", "sbcglobal.net",
        "att.net", "outlook.com", "icloud.com",
    ]
};

EmailInput.propTypes = {
    domains: PropTypes.arrayOf(PropTypes.string),
};


const input_styles = {
  emailautocomplete: {
    display: "flex",
    flexDirection: "column"
  },
  emailautocomplete_dropdown: {
    display: "block",
    position: "relative",
  },
  dropdown: {
    display: "block",
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: colors.text_white,
  },
}

export default EmailInput;