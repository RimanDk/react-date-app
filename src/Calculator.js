// libs
import React, { useEffect, useState } from 'react';

// internals
import { calculateDays } from './helpers/calculateDays.helper';
import debounce from './helpers/debounce.helper';
import { isDateValid } from './helpers/isDateValid.helper';
import { isUnknown, isValid } from './constants';

// styling
import './Calculator.css'

function Calculator() {
    const [from, setFrom] = useState({ value: '', valid: isUnknown });
    const [to, setTo] = useState({ value: '', valid: isUnknown });
    const [days, setDays] = useState(0);

    const revalidate = debounce((props) => {
        if ('from' in props) {
            setFrom((prev) => ({
                ...prev,
                ...isDateValid(props.from)
            }));
        } else {
            setTo((prev) => ({
                ...prev,
                ...isDateValid(props.to)
            }));
        }
    });

    useEffect(() => {
        if (from.valid === isValid && to.valid === isValid) {
            setDays(calculateDays(from.value, to.value));
        }
    }, [from.value, to.value, from.valid, to.valid])

    return (
        <section className="calculator">
            <header>
                <h1>Date range calculator</h1>
                <p>Enter two dates to calculate how many days there are between them.</p>
                <p>Please note that dates older than 45 B.C. (the introduction of the Julian calendar) are not currently supported.
                    Also note that there is an upper limit to how far into the future you can look.</p>
            </header>

            <form name="date-range-calculator">
                <fieldset>
                    <label className={!~from.valid ? 'invalid' : ''}>
                        <span>Start date</span>
                        <input type="text" placeholder="YYYY-MM-DD" value={from.value} onChange={(e) => {
                            setFrom({
                                value: e.target.value,
                                valid: isUnknown
                            });
                            revalidate({ from: e.target.value });
                        }} />
                        {!~from.valid && (<dl>
                            <dd>{from.msg}</dd>
                        </dl>)}
                    </label>
                    <label className={!~to.valid ? 'invalid' : ''}>
                        <span>End date</span>
                        <input type="text" placeholder="YYYY-MM-DD" value={to.value} onChange={(e) => {
                            setTo({
                                value: e.target.value,
                                valid: isUnknown
                            });
                            revalidate({ to: e.target.value });
                        }} />
                        {!~to.valid && (<dl>
                            <dd>{to.msg}</dd>
                        </dl>)}
                    </label>
                </fieldset>
            </form>

            {from.valid === isValid && to.valid === isValid && (
                <article>
                    <p data-testid="result-txt">There are <strong data-testid="result">{days} days</strong> between the two given dates.</p>
                </article>
            )}
        </section>
    )
}

Calculator.displayName = 'Calculator';

export default Calculator;
