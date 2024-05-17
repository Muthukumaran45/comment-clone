import React, { useState } from 'react';

// person icon
import { IoPersonOutline } from "react-icons/io5";

// delete icon
import { RiDeleteBinLine } from "react-icons/ri";

// comments sending icon
import { VscSend } from "react-icons/vsc";

// note icon
import { CiStickyNote } from "react-icons/ci";







const people = [
  { id: '1', name: 'Muthu', picture: './assets/man1.png' },
  { id: '2', name: 'kumaran', picture: './assets/man2.png' },
  { id: '3', name: 'jave smith', picture: './assets/woman.png' }
];


const App = () => {
  const [event, setEvent] = useState({
    id: 1,
    assignedTo: '',
    comments: []
  });
  const [newComment, setNewComment] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const updatedComments = [...event.comments, { text: newComment.trim(), person: event.assignedTo }];
      setEvent({ ...event, comments: updatedComments });
      setNewComment('');
    }
  };

  const handleDeleteComment = (index) => {
    const updatedComments = event.comments.filter((_, i) => i !== index);
    setEvent({ ...event, comments: updatedComments });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">

        <div className="col-lg-4 shadow py-5 px-3 ">

          <h4 className='text-center border rounded-5  py-2 text-danger'>Flower Arrangement</h4>
          <h6 className='text-center border rounded-5  py-2 '>DEC 5, {new Date().getFullYear()} at 8:00-10:00 AM</h6>

          <div className="form-group d-flex align-items-center mt-4">
            <label className=""><IoPersonOutline size='1.3rem' className='mx-3' color='red' />Assign :</label>
            <div className=" d-flex align-items-center border px-3 py-2 mx-3 rounded-5">
              {event.assignedTo && (
                <img
                  src={people.find(person => person.id === event.assignedTo)?.picture}
                  alt="Assigned Person"
                  style={{ width: '28px', height: '28px', marginRight: '10px' }}
                />
              )}

              {/* select person */}
              <select
                name="assignedTo"
                className="border-0"
                value={event.assignedTo}
                onChange={handleInputChange}
                style={{ outline: 'none' }}
              >
                <option value="" className='border-0'>Select Person</option>
                {people.map(person => (
                  <option className='border-0' key={person.id} value={person.id}>
                    {person.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4">
            <p><CiStickyNote className='mx-3' size='1.4rem' color='red' />Note : <span className='border p-2 rounded-3 mx-4'>09382049832</span></p>
          </div>






          {/* comment section */}
          <div className="mt-5 pt-4 border-top">
            <h3 className='pb-4'><em>Comments</em></h3>



            {/* after comment showing input */}
            <ul className="list-group">
              {event.comments.map((comment, index) => {
                const person = people.find(p => p.id === comment.person);
                return (
                  <li key={index} className="list-group-item border-0">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        {person && (
                          <img
                            src={person.picture}
                            alt={person.name}
                            style={{ width: '20px', height: '20px', marginRight: '10px' }}
                          />
                        )}
                        <strong className='text-secondary'>{person?.name}</strong>
                      </div>
                      <button className="btn border-0 btn-sm" onClick={() => handleDeleteComment(index)}><RiDeleteBinLine size='1.3rem' color='red' /></button>
                    </div>
                    <p className="mb-1 mt-2 text-secondary" style={{ paddingLeft: '2rem' }}>{comment.text}</p>
                  </li>
                );
              })}
            </ul>


            {/* comment typing input */}
            <div className="input-group mt-3">
              {event.assignedTo && (
                <div className="input-group-prepend">
                  <span className="">
                    <img
                      src={people.find(person => person.id === event.assignedTo)?.picture}
                      alt="Assigned Person"
                      className='mt-2 mx-3'
                      style={{ width: '35px', height: '35px' }}
                    />
                  </span>
                </div>
              )}

              <input
                type="text"
                className="border rounded-5 px-3 text-secondary"
                style={{ outline: 'none', width: '68%' }}
                value={newComment}
                onChange={handleCommentChange}
              />
              <div className="input-group-append">
                <button className="btn border-0" onClick={handleAddComment}><VscSend size='1.5rem' color='red' /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
