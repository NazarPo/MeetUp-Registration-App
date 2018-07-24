import '../../../../components-styles/user/Card.css';
import React from 'react';

function createDatesArray(dates) {
    let onlyDates = [];
    if (typeof dates !== 'undefined')
        dates.forEach((item) => {
            onlyDates.push(new Date(item.date).toDateString());
        });
    return onlyDates;
}

const Card = (props) => {
    let meetup = props.meetup;
    return (
        <div className="card user-card not-active">
            <img className="card-img-top" src={meetup.image} alt="Card image cap"/>
            <div className="card-body">
                <p className="card-text">{meetup.description}</p>
                <h6><b>Дата проведення: </b>{createDatesArray(meetup.dates).join(', ')}</h6>
                <h6><b>Час початку: </b>{meetup.startTime}</h6>
                <h6><b>Адреса: </b>м.Черкаси, вул.Грушевського 19/3</h6>
            </div>
            <div className="card-footer">
                {
                    !meetup.isActive && (
                        <a href={meetup.blogLink}>
                            <button type="button" className="btn btn-light">Read more</button>
                        </a>
                    )
                }
                {
                    meetup.isActive && (
                        <button
                            type="button"
                            className="btn btn-success"
                            onClick={props.onClick}
                        >Зареєструватися</button>
                    )
                }
            </div>
        </div>
    );
}

export default Card;