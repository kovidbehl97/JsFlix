$(document).ready(function() {
  document.getElementById("currentUser").innerHTML = "Welcome" + "&nbsp;&nbsp;" + window.localStorage.getItem("currentUsername");
  const seatContainer = document.querySelector('.seatContainer');
  const seats = document.querySelectorAll('.seat-row .seat:not(.filled)');
  const calculate = document.getElementById('calc');
  const total = document.getElementById('total');
  const movieOptions = document.getElementById('movie-options');

  fillSeats();

  let priceOfTicket = +movieOptions.value;

  // Saving Current Movie Index And Price

  function setData(mIndex, mPrice) {
      localStorage.setItem('selectedmIndex', mIndex);
      localStorage.setItem('selectedmPrice', mPrice);
  }

  // Updating Total and Calculate

  function updateCurrentCalc() {
      const currentSeats = document.querySelectorAll('.seat-row .seat.current');

      const indexOfSeats = [...currentSeats].map(seat=>[...seats].indexOf(seat));

      localStorage.setItem('currentSeats', JSON.stringify(indexOfSeats));

      const currentSeatsCalc = currentSeats.length;

      calculate.innerText = currentSeatsCalc;
      total.innerText = currentSeatsCalc * priceOfTicket;
  }

  // Get Data From LocalStorage and FillSeats

  function fillSeats() {
      const currentSeats = JSON.parse(localStorage.getItem('currentSeats'));

      if (currentSeats !== null && currentSeats.length > 0) {
          seats.forEach((seat,index)=>{
              if (currentSeats.indexOf(index) > -1) {
                  seat.classList.add('current');
              }
          }
          );
      }

      const selectedmIndex = localStorage.getItem('selectedmIndex');

      if (selectedmIndex !== null) {
          movieOptions.selectedIndex = selectedmIndex;
      }
  }

  // Event Listener For Movie Selection

  movieOptions.addEventListener('change', e=>{
      priceOfTicket = +e.target.value;
      setData(e.target.selectedIndex, e.target.value);
      updateCurrentCalc();
  }
  );

  // Event Listener For When You Click On The Seat

  seatContainer.addEventListener('click', e=>{
      if (e.target.classList.contains('seat') && !e.target.classList.contains('filled')) {
          e.target.classList.toggle('current');

          updateCurrentCalc();
      }
  }
  );

  $("#logout").click(function() {
      window.history.go(-1)
  })
  updateCurrentCalc();

  $("#bookNow").click(function() {
      // alert(total.innerText + calc.innerText )
      // alert($("#movie-options option:selected").text());
      alert(`Total Seat: ${calc.innerText} Seats \n Movie: ${$("#movie-options option:selected").text()} \n Total Cost: $${total.innerText}`);
  });

});
