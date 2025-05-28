import React, { useReducer } from "react";

const initialState = {
  name: "",
  establishment_year: "",
  address: {
    building: "",
    street: "",
    city: {
      name: "",
      locality: {
        pinCode: "",
        landmark: "",
      },
    },
    state: "",
    coordinates: {
      latitude: "",
      longitude: "",
    },
  },
  courses_offered: [],
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.payload.field]: action.payload.value,
        error: null,
      };
    case "UPDATE_ADDRESS":
      return {
        ...state,
        address: {
          ...state.address,
          [action.payload.field]: action.payload.value,
        },
        error: null,
      };
    case "UPDATE_CITY":
      return {
        ...state,
        address: {
          ...state.address,
          city: {
            ...state.address.city,
            [action.payload.field]: action.payload.value,
          },
        },
        error: null,
      };
    case "UPDATE_LOCALITY":
      return {
        ...state,
        address: {
          ...state.address,
          city: {
            ...state.address.city,
            locality: {
              ...state.address.city.locality,
              [action.payload.field]: action.payload.value,
            },
          },
        },
        error: null,
      };
    case "UPDATE_COORDINATES":
      return {
        ...state,
        address: {
          ...state.address,
          coordinates: {
            ...state.address.coordinates,
            [action.payload.field]: action.payload.value,
          },
        },
        error: null,
      };
    case "UPDATE_COURSES":
      return {
        ...state,
        courses_offered: action.payload
          .split(",")
          .map((course) => course.trim()),
        error: null,
      };
    case "reset":
      return initialState;
    default:
      return {
        ...state,
        error: "invalid action type",
      };
  }
}

function CollegeForm() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [submitted, setSubmitted] = React.useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };
  const handleReset = (e) => {
    dispatch({ type: "reset" });
    setSubmitted(false);
  };
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded mt-10">
      <h1 className="text-2xl font-bold mb-6">College Registration Form</h1>

      <form onSubmit={handleSubmit} className="grid gap-4">
        <input
          className="border border-gray-300 rounded p-2"
          placeholder="College Name"
          value={state.name}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_FIELD",
              payload: { field: "name", value: e.target.value },
            })
          }
        />

        <input
          className="border border-gray-300 rounded p-2"
          placeholder="Establishment Year"
          value={state.establishment_year}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_FIELD",
              payload: { field: "establishment_year", value: e.target.value },
            })
          }
        />

        <input
          className="border border-gray-300 rounded p-2"
          placeholder="Building"
          value={state.address.building}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_ADDRESS",
              payload: { field: "building", value: e.target.value },
            })
          }
        />

        <input
          className="border border-gray-300 rounded p-2"
          placeholder="Street"
          value={state.address.street}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_ADDRESS",
              payload: { field: "street", value: e.target.value },
            })
          }
        />

        <input
          className="border border-gray-300 rounded p-2"
          placeholder="City"
          value={state.address.city.name}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_CITY",
              payload: { field: "name", value: e.target.value },
            })
          }
        />

        <input
          className="border border-gray-300 rounded p-2"
          placeholder="Pincode"
          value={state.address.city.locality.pinCode}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_LOCALITY",
              payload: { field: "pinCode", value: e.target.value },
            })
          }
        />

        <input
          className="border border-gray-300 rounded p-2"
          placeholder="Landmark"
          value={state.address.city.locality.landmark}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_LOCALITY",
              payload: { field: "landmark", value: e.target.value },
            })
          }
        />

        <input
          className="border border-gray-300 rounded p-2"
          placeholder="State"
          value={state.address.state}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_ADDRESS",
              payload: { field: "state", value: e.target.value },
            })
          }
        />

        <input
          className="border border-gray-300 rounded p-2"
          placeholder="Latitude"
          value={state.address.coordinates.latitude}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_COORDINATES",
              payload: { field: "latitude", value: e.target.value },
            })
          }
        />

        <input
          className="border border-gray-300 rounded p-2"
          placeholder="Longitude"
          value={state.address.coordinates.longitude}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_COORDINATES",
              payload: { field: "longitude", value: e.target.value },
            })
          }
        />

        <input
          className="border border-gray-300 rounded p-2"
          placeholder="Courses (comma-separated)"
          value={state.courses_offered.join(", ")}
          onChange={(e) =>
            dispatch({ type: "UPDATE_COURSES", payload: e.target.value })
          }
        />

        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
          <button
            type="button"
            className="bg-gray-400 text-white px-4 py-2 rounded"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </form>

      {state.error && (
        <div className="mt-4 text-red-500 font-bold">{state.error}</div>
      )}

      {submitted && (
        <div className="mt-6 p-4 border rounded bg-gray-100">
          <h2 className="font-bold text-xl mb-2">Submitted College Details:</h2>
          <pre className="whitespace-pre-wrap text-sm">
            {JSON.stringify(state, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default CollegeForm;
