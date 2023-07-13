<template>
    <v-row justify="end">
      <v-dialog
        v-model="dialog"
        persistent
        width="500"
      >
      <template v-slot:activator="{ props }">
        <v-btn
            variant="outlined" 
            color="#115173"
            class="btn"
            v-bind="props"
        >
        <span id="plus">+ </span> New Ticket
        </v-btn>
      </template>
        <v-card>
          <v-container>
              <h2>Raise an Issue</h2>
              <v-divider class="py-1"></v-divider>
                <VForm class="form">
                    <div class="inputDiv">
                    <select
                        name="category"
                        class="input"
                    >
                    <option value="" disabled selected>I need help regarding</option>
                    <option value="Hardware">Hardware</option>
                    <option value="Software">Software</option>
                    <option value="HR Queries">HR Queries</option>
                    <option value="Ontime">Ontime</option>

                  </select>
                    <ErrorMessage name="category" class="error_message" />
                    </div>

                    <div class="inputDiv">
                    <input
                        name="title"
                        placeholder="Issue in brief"
                        type="text"
                        class="input"
                    />
                    <ErrorMessage name="title" class="error_message" />
                    </div>

                    <div class="inputDiv">
                    <textarea
                        name="description"
                        placeholder="Detailed Description"
                        type="text"
                        class="input"
                    />
                    <ErrorMessage name="description" class="error_message" />
                    </div>

                    <div class="inputDiv">
                    <select
                        name="priority"
                        class="input"
                    >
                    <option value="" disabled selected>Select Priority</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>

                  </select>
                    <ErrorMessage name="priority" class="error_message" />
                    </div>

            <small>*indicates required field</small>

            <v-spacer></v-spacer>
            <div class="d-flex justify-end">
              <v-btn type="reset" @click="dialog = false">Cancel</v-btn>
              <v-btn class="me-4 text-white ml-2 btn-submit" type="submit" color="#115173" @click.prevent="dialog = false"> Submit </v-btn>
            </div>
            </VForm>
          </v-container>
        </v-card>
      </v-dialog>
    </v-row>
</template>

<script setup lang="ts">  
    import { ref } from 'vue'
    const dialog = ref(false);
</script>


<style>
  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #plus {
    font-size: 2rem;
    font-weight: 300;
    margin-top: -4px;
    padding-right: 2px;
  }


.form-heading { 
    font-weight: 900;
}

.form-heading::after {
    content: "";
    width: 50%;
    height: 2px;
    background: #0000008d;
    display: block;
    margin: auto;
}


.form .inputDiv {
    margin: 15px 0;
}


.form .inputDiv input, textarea,
.inputDiv select {
    padding: 10px;
    display: block;
    width: 100%;
    outline: none;
    border: 1px solid #0000003d;
}


.error_message {
    color: #f44b4b;
}

</style>