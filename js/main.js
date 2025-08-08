$(document).ready(function() {
  $.getJSON('/js/events.json', function(data) {
      const today = new Date();
      let nextEvent = null;
      
      $.each(data.events, function(key, event) {
          if (event.status === true) {
              const startDateStr = event.start_date.replace(/\.$/, '');
              const [startYear, startMonth, startDay] = startDateStr.split('.');
              const startDate = new Date(startYear, startMonth - 1, startDay);

              nextEvent = event;
              nextEvent.start_date_display = event.start_date;
              nextEvent.end_date_display = event.end_date;
              
    
          }
      });
      
      if (nextEvent) {
          $('.event-name').text(nextEvent.event_name);
        
          const startDateDisplay = nextEvent.start_date_display.split('.');
          $('.event-start').text(startDateDisplay[1] + '.' + startDateDisplay[2] + '.');

          const endDateDisplay = nextEvent.end_date_display.split('.');
          $('.event-end').text(endDateDisplay[1] + '.' + endDateDisplay[2] + '.');
          
          const formattedPrize = nextEvent.prize.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          $('.event-sats').text(formattedPrize);
          
          const shortAddress = nextEvent.address.length > 15 
              ? nextEvent.address.substring(0, 8) + '...' + nextEvent.address.substring(nextEvent.address.length - 8)
              : nextEvent.address;
          $('.event-address').text(shortAddress);
          
          $('.event-address-link').attr('href', 'https://mempool.space/address/' + nextEvent.address);
      } else {
        $('#on-going').html('<div><strong id="event-name">No ongoing hunt.</strong></div><div>Check back later for new events!</div>')
      }
  }).fail(function() {
      $('.event-name').text('Error loading events');
      console.error('Error loading events.json');
  });
});

$(window).on('scroll', function() {
  if ($(this).scrollTop() > 300) {
    $('.navbar').addClass('scrolled-header');
  } else {
    $('.navbar').removeClass('scrolled-header');
  }

  const scrollPosition = $(window).scrollTop() + $(window).height();
  const threshold = $(document).height() - 100;

  if (scrollPosition >= threshold) {
    $('#on-going').hide();
  } else {
    $('#on-going').show();
  }
});

let timeout;

$('.easter-egg').on('click', function() {
  const $img = $(this);

  const originalSrc = $img.data('original-src') || $img.attr('src');
  const newSrc = originalSrc.replace('logo.svg', 'logo_xx.svg');

  if (!$img.data('original-src')) {
    $img.data('original-src', originalSrc);
  }

  clearTimeout(timeout);

  $img.attr('src', newSrc);

  timeout = setTimeout(function() {
    $img.attr('src', $img.data('original-src'));
  }, 500);
});